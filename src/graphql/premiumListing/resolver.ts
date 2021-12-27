import { IResolvers } from 'graphql-tools';
import { IResultDoc, IResultDocs, IPremiumListing } from '../../common/interface';
import { TTL_FOR_QUERY, TTL_FOR_ID, MAXIMUM_LIMIT_SIZE } from '../../configs/constant';

const resolvers: IResolvers = {
  Query: {
    premiumListing: async (_, { _id }, { dataSources: { PremiumListing } }) => {
      const result: IResultDoc = {
        status: 200,
        message: 'Success'
      };
      try {
        if (!_id) throw Error('Require id premiumListing valid.');

        const doc = await PremiumListing.findOneById(_id, { ttl: TTL_FOR_ID });
        result.data = doc;
      } catch (error) {
        result.status = 400;
        result.message = error.message;
      }
      return result;
    },
    premiumListingsByIds: async (_, { ids }, { dataSources: { PremiumListing } }) => {
      const result: IResultDocs = {
        status: 200,
        message: 'Success',
        data: []
      };
      try {
        if (!ids?.length) throw Error('Require list ids premiumListing valid.');

        const doc = await PremiumListing.findManyByIds(ids, { ttl: TTL_FOR_ID });
        result.data = doc;
      } catch (error) {
        result.status = 400;
        result.message = error.message;
      }
      return result;
    },
    premiumListings: async (_, { orderBy, where, limit = 20, skip = 0 }, { dataSources: { PremiumListing } }) => {
      let result: IResultDocs = {
        status: 200,
        message: 'Success',
        data: []
      };
      try {
        if (limit > MAXIMUM_LIMIT_SIZE) limit = MAXIMUM_LIMIT_SIZE;
        const docs = await PremiumListing.filterAndPaging(
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
    createPremiumListing: async (_, { input }, { dataSources: { PremiumListing }, user }) => {
      let result: IResultDoc = {
        status: 200,
        message: 'Success'
      };
      try {
        const createdDocument = await PremiumListing.create(input, TTL_FOR_ID);
        result.data = createdDocument;
      } catch (err) {
        result.status = 400;
        result.message = err.message;
      }
      return result;
    },
    updatePremiumListing: async (_, { input }, { dataSources: { PremiumListing }, user }) => {
      let result: IResultDoc = {
        status: 200,
        message: 'Success'
      };
      try {
        const { _id } = input;
        // Check exist document
        const existingDoc: IPremiumListing = await PremiumListing.findOneById(_id, { ttl: TTL_FOR_ID });
        if (!existingDoc) throw new Error('PremiumListing not exist');

        const docs = await PremiumListing.update(input, TTL_FOR_ID);

        result.data = docs;
      } catch (err) {
        result.status = 400;
        result.message = err.message;
      }
      return result;
    },
    removePremiumListing: async (_, { _id }, { dataSources: { PremiumListing }, user, logger }) => {
      let result: IResultDoc = {
        status: 200,
        message: 'Removed success'
      };
      try {
        // Check exist document
        const existingDoc: IPremiumListing = await PremiumListing.findOneById(_id, { ttl: TTL_FOR_ID });
        if (!existingDoc) throw new Error('PremiumListing not exist');

        await PremiumListing.remove({ _id });
        logger.warn(`User (${user?.username || user?._id}) removed premiumListing id: ${_id}`);
      } catch (error) {
        result.status = 400;
        result.message = error.message;
      }
      return result;
    }
  }
};

export default resolvers;
