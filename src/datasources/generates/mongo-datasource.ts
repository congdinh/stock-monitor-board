import { DataSource } from 'apollo-datasource';
import { ApolloError } from 'apollo-server-errors';
import { InMemoryLRUCache } from 'apollo-server-caching';

import { createCachingMethods } from './cache';
import { isCollectionOrModel } from './helpers';

interface IMongoDataSource {
  collection?: any;
  context?: object;
  cache?: any;
  debug?: boolean;
  allowFlushingCollectionCache?: boolean;
}

class MongoDataSource extends DataSource {
  public collection: any;
  public context: object = {};
  public cache: any;
  public debug: boolean = false;
  public allowFlushingCollectionCache: boolean = false;
  findOneById: any;
  findManyByIds: any;
  findManyByQuery: any;
  findManyByQueryAndOption: any;
  deleteFromCacheById: any;
  deleteFromCacheByIds: any;
  deleteFromCachedByQuery: any;
  deleteManyFromQueryCollectionCache: any;
  flushCollectionCache: any;

  constructor(collection: any) {
    super();

    if (!isCollectionOrModel(collection)) {
      throw new ApolloError('MongoDataSource constructor must be given an object with a single collection');
    }
    this.collection = collection;
  }

  initialize({ context = {}, cache, debug, allowFlushingCollectionCache }: IMongoDataSource) {
    this.context = context;
    const methods = createCachingMethods({
      collection: this.collection,
      cache: cache || new InMemoryLRUCache(),
      debug,
      allowFlushingCollectionCache
    });
    Object.assign(this, methods);
  }
}
export { MongoDataSource, IMongoDataSource };
