/* eslint-disable import/prefer-default-export */
import DataLoader from 'dataloader';
import sift from 'sift';
import { getCollection } from './helpers';
import LoggerService from '../../external-libs/winston';

const logger = new LoggerService();

interface IHandleCache {
  ttl?: any;
  doc: any;
  key: string;
  cache: any;
}

interface ICachingMethod {
  collection?: any;
  cache: any;
  debug?: boolean;
  allowFlushingCollectionCache?: boolean;
}

interface ICacheExpires {
  ttl?: string;
}

const isDocContainsData = (doc: any) => (doc && !Array.isArray(doc)) || (doc && Array.isArray(doc) && doc.length > 0);

const handleCache = async ({ ttl, doc, key, cache }: IHandleCache) => {
  if (isDocContainsData(doc) && key && Number.isInteger(ttl)) {
    cache.set(key, JSON.stringify(doc), {
      ttl
    });
  }
};

const orderDocs = (ids: string[]) => (docs: any[]) => {
  const idMap: any = {};
  docs.forEach((doc: any) => {
    idMap[doc._id] = doc;
  });
  return ids.map((id: string) => idMap[id]);
};

export const createCachingMethods = ({
  collection,
  cache,
  allowFlushingCollectionCache = false,
  debug = false
}: ICachingMethod) => {
  const isRedis = typeof cache.store === 'undefined';
  const isMongoose = typeof collection === 'function';
  const loader = new DataLoader(
    (ids: any) =>
      isMongoose
        ? collection
            .find({ _id: { $in: ids } })
            .collation({ locale: 'en' })
            .lean()
            .then(orderDocs(ids))
        : collection
            .find({ _id: { $in: ids } })
            .collation({ locale: 'en' })
            .toArray()
            .then(orderDocs(ids)),
    { cache: false }
  );

  const cachePrefix = collection && `mongo:${getCollection(collection).collectionName}:`;
  const cachePrefixQueryOption = `${cachePrefix}query:`;

  const dataQuery = isMongoose
    ? ({ queries }: any) => {
        return collection
          .find({ $or: queries })
          .collation({ locale: 'en' })
          .lean()
          .then((items: any[]) => {
            return queries.map((query: any) => items.filter(sift(query)));
          });
      }
    : ({ queries }: any) =>
        collection
          .find({ $or: queries })
          .collation({ locale: 'en' })
          .toArray()
          .then((items: any[]) => queries.map((query: any) => items.filter(sift(query))));

  const queryLoader = new DataLoader((queries) => dataQuery({ queries }));

  // dataloader query with options
  const dataQueryWithOption = ({ queries }: any) => {
    const filter = queries.map((query: any) => {
      const { select, option, ...other } = query;
      return other.query;
    });
    const select = (queries && queries[0] && queries[0].select) || null;

    const option = (queries && queries[0] && queries[0].option) || null;

    return collection
      .find({ $or: filter }, select, option)
      .collation({ locale: 'en' })
      .lean()
      .then((items: any[]) =>
        queries.map((query: any) => {
          const { select, option, ...other } = query;
          return items.filter(sift(other.query));
        })
      );
  };

  const queryWithOptionLoader = new DataLoader((queries) => dataQueryWithOption({ queries }));

  const methods: any = {
    findOneById: async (id: string, { ttl }: ICacheExpires = {}) => {
      if (!id) return null;
      const key = cachePrefix + id;

      const cacheDoc = await cache.get(key);
      logger.warn('Caching', { key, cacheDoc: cacheDoc ? 'cache' : 'miss' });
      if (cacheDoc) {
        return JSON.parse(cacheDoc);
      }

      const doc = await loader.load(id);
      await handleCache({
        ttl,
        doc,
        key,
        cache
      });

      return doc;
    },

    getCache: (key: string) => {
      return cache.get(key);
    },
    setCache: async (key: string, doc: any, { ttl }: ICacheExpires = {}) => {
      // cache.set(key, doc, { ttl });
      await handleCache({
        ttl,
        doc,
        key,
        cache
      });
    },

    findManyByIds: (ids: string[], { ttl }: ICacheExpires = {}) =>
      (ids?.length &&
        Promise.all(ids.map((id) => methods.findOneById(id, { ttl }))).then((result) => result.filter((i) => i))) ||
      [],

    findManyByQuery: async (query: string, { ttl }: ICacheExpires = {}) => {
      const key = cachePrefixQueryOption + JSON.stringify(query);

      const cacheDocs = await cache.get(key);
      logger.warn('Caching', { key, cacheDocs: (cacheDocs && 'cache') || 'miss' });
      if (cacheDocs) {
        return JSON.parse(cacheDocs);
      }
      const docs = await queryLoader.load(query);
      await handleCache({
        ttl,
        doc: docs,
        key,
        cache
      });
      return docs;
    },

    // Find Many by query and option
    findManyByQueryAndOption: async ({ query, select = null, option = {} }: any, { ttl }: ICacheExpires = {}) => {
      const key = cachePrefixQueryOption + JSON.stringify({ query, select, option });
      const cacheDocs = await cache.get(key);
      logger.warn('Caching', { key, cacheDocs: (cacheDocs && 'cache') || 'miss' });
      if (cacheDocs) {
        return JSON.parse(cacheDocs);
      }
      const docs = await queryWithOptionLoader.load({
        query,
        select,
        option
      });
      await handleCache({
        ttl,
        doc: docs,
        key,
        cache
      });
      return docs;
    },
    // eslint-disable-next-line no-param-reassign
    deleteFromCacheById: async (id: string) => {
      const key = id && typeof id === 'object' ? JSON.stringify(id) : id; // NEW
      await cache.delete(cachePrefix + key);
    }, // this works also for byQueries just passing a stringified query as the id

    deleteFromCacheByIds: async (ids: string[]) => {
      Promise.all(ids.map((id) => methods.deleteFromCacheById(id)));
    },

    deleteFromCachedByQuery: async (query: string) => {
      const key = cachePrefix + JSON.stringify(query);
      await cache.delete(key);
    },
    // eslint-disable-next-line no-param-reassign
    deleteManyFromQueryCollectionCache: async () => {
      if (isRedis) {
        const redis = cache.client;
        const stream = redis.scanStream({
          match: `${cachePrefixQueryOption}*`
        });
        stream.on('data', (keys: string[]) => {
          // `keys` is an array of strings representing key names
          if (keys.length) {
            const pipeline = redis.pipeline();
            keys.forEach((key) => {
              pipeline.del(key);
              if (debug) {
                console.log('KEY', key, 'deleted');
              }
            });
            pipeline.exec();
          }
        });
        stream.on('end', () => {
          if (debug) {
            console.log(`Deleted ${cachePrefixQueryOption}*`);
          }
        });
        return 'ok';
      }
      return null;
    },
    // eslint-disable-next-line no-param-reassign
    deleteManyFromPatternKeyCollectionCache: async (patternKey: string) => {
      const matchKey: string = `${cachePrefix}${patternKey}*`;
      if (isRedis) {
        const redis = cache.client;
        const stream = redis.scanStream({
          match: matchKey
        });
        stream.on('data', (keys: string[]) => {
          // `keys` is an array of strings representing key names
          if (keys.length) {
            const pipeline = redis.pipeline();
            keys.forEach((key) => {
              pipeline.del(key);
              if (debug) {
                console.log('KEY', key, 'deleted');
              }
            });
            pipeline.exec();
          }
        });
        stream.on('end', () => {
          if (debug) {
            console.log(`Deleted ${matchKey}`);
          }
        });
        return 'ok';
      }
      return null;
    },
    // eslint-disable-next-line no-param-reassign
    flushCollectionCache: async () => {
      if (!allowFlushingCollectionCache) return null;
      if (isRedis) {
        const redis = cache.client;
        const stream = redis.scanStream({
          match: `${cachePrefix}*`
        });
        stream.on('data', (keys: string[]) => {
          // `keys` is an array of strings representing key names
          if (keys.length) {
            const pipeline = redis.pipeline();
            keys.forEach((key) => {
              pipeline.del(key);
              if (debug) {
                console.log('KEY', key, 'flushed');
              }
            });
            pipeline.exec();
          }
        });
        stream.on('end', () => {
          if (debug) {
            console.log(`Flushed ${cachePrefix}*`);
          }
        });
        return 'ok';
      }
      return null;
    }
  };
  return methods;
};
