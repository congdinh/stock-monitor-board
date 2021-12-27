import { IResolvers } from 'graphql-tools';
import { IResultDoc, IResultDocs, ISymbol } from '../../common/interface';
import { SHARED_STATUS } from '../../configs/constant';
import { TTL_FOR_QUERY, TTL_FOR_ID, MAXIMUM_LIMIT_SIZE } from '../../configs/constant';

const resolvers: IResolvers = {
  Query: {
    symbol: async (_, { _id }, { dataSources: { Symbol } }) => {
      const result: IResultDoc = {
        status: 200,
        message: 'Success'
      };
      try {
        if (!_id) throw Error('Require id symbol valid.');

        const doc = await Symbol.findOneById(_id, { ttl: TTL_FOR_ID });
        result.data = doc;
      } catch (error) {
        result.status = 400;
        result.message = error.message;
      }
      return result;
    },
    symbolsByIds: async (_, { ids }, { dataSources: { Symbol } }) => {
      const result: IResultDocs = {
        status: 200,
        message: 'Success',
        data: []
      };
      try {
        if (!ids?.length) throw Error('Require list ids symbol valid.');

        const doc = await Symbol.findManyByIds(ids, { ttl: TTL_FOR_ID });
        result.data = doc;
      } catch (error) {
        result.status = 400;
        result.message = error.message;
      }
      return result;
    },
    symbols: async (_, { orderBy, where, limit = 20, skip = 0 }, { dataSources: { Symbol } }) => {
      let result: IResultDocs = {
        status: 200,
        message: 'Success',
        data: []
      };
      try {
        // if (limit > MAXIMUM_LIMIT_SIZE) limit = MAXIMUM_LIMIT_SIZE;
        const docs = await Symbol.filterAndPaging(
          {
            orderBy,
            where,
            limit,
            skip
          },
          TTL_FOR_QUERY
        );

        result = {
          ...result,
          ...docs
        };
      } catch (error) {
        result.status = 400;
        result.message = error.message;
      }
      return result;
    }
  },
  Mutation: {
    createSymbol: async (_, { input }, { dataSources: { Symbol }, user }) => {
      let result: IResultDoc = {
        status: 200,
        message: 'Success'
      };
      try {
        const createdDocument = await Symbol.create(input, TTL_FOR_ID);

        result.data = createdDocument;
      } catch (err) {
        result.status = 400;
        result.message = err.message;
      }
      return result;
    },
    updateSymbol: async (_, { input }, { dataSources: { Symbol }, user }) => {
      let result: IResultDoc = {
        status: 200,
        message: 'Success'
      };
      try {
        const { _id } = input;
        // Check exist document
        const existingDoc: ISymbol = await Symbol.findOneById(_id, { ttl: TTL_FOR_ID });
        if (!existingDoc) throw new Error('Symbol not exist');

        const docs = await Symbol.update(input, TTL_FOR_ID);

        result.data = docs;
      } catch (err) {
        result.status = 400;
        result.message = err.message;
      }
      return result;
    },
    removeSymbol: async (_, { _id }, { dataSources: { Symbol }, user, logger }) => {
      let result: IResultDoc = {
        status: 200,
        message: 'Removed success'
      };
      try {
        // Check exist document
        const existingDoc: ISymbol = await Symbol.findOneById(_id, { ttl: TTL_FOR_ID });
        if (!existingDoc) throw new Error('Symbol not exist');

        await Symbol.remove({ _id });
        logger.warn(`User (${user?.username || user?._id}) removed symbol id: ${_id}`);
      } catch (error) {
        result.status = 400;
        result.message = error.message;
      }
      return result;
    }
  }
};

export default resolvers;
