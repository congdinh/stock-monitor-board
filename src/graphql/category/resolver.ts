import { IResolvers } from 'graphql-tools';
import { IResultDoc, IResultDocs, ICategory } from '../../common/interface';
import { TTL_FOR_QUERY, TTL_FOR_ID, MAXIMUM_LIMIT_SIZE, CATEGORY_TYPE } from '../../configs/constant';

const resolvers: IResolvers = {
  Query: {
    category: async (_, { _id }, { dataSources: { Category } }) => {
      const result: IResultDoc = {
        status: 200,
        message: 'Success'
      };
      try {
        if (!_id) throw Error('Require id category valid.');

        const doc = await Category.findOneById(_id, { ttl: TTL_FOR_ID });
        result.data = doc;
      } catch (error) {
        result.status = 400;
        result.message = error.message;
      }
      return result;
    },
    categoriesByIds: async (_, { ids }, { dataSources: { Category } }) => {
      const result: IResultDocs = {
        status: 200,
        message: 'Success',
        data: []
      };
      try {
        if (!ids?.length) throw Error('Require list ids category valid.');

        const doc = await Category.findManyByIds(ids, { ttl: TTL_FOR_ID });
        result.data = doc;
      } catch (error) {
        result.status = 400;
        result.message = error.message;
      }
      return result;
    },
    categories: async (_, { orderBy, where, limit = 20, skip = 0 }, { dataSources: { Category } }) => {
      let result: IResultDocs = {
        status: 200,
        message: 'Success',
        data: []
      };
      try {
        if (limit > MAXIMUM_LIMIT_SIZE) limit = MAXIMUM_LIMIT_SIZE;
        const docs = await Category.filterAndPaging(
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
    },
    randomCategory: async (_, __, { dataSources: { Category } }) => {
      const result: IResultDoc = {
        status: 200,
        message: 'Success'
      };
      try {
        const doc = await Category.collection.aggregate([{ $sample: { size: 1 } }]);
        result.data = doc[0] || null;
      } catch (error) {
        result.status = 400;
        result.message = error.message;
      }
      return result;
    },
    optionalCategory: async (_, __, { dataSources: { Category } }) => {
      const result: IResultDocs = {
        status: 200,
        message: 'Success',
        data: []
      };
      try {
        const docs = await Category.findManyByQuery({ type: CATEGORY_TYPE.OPTIONAL }, { ttl: TTL_FOR_QUERY });
        result.data = docs;
      } catch (error) {
        result.status = 400;
        result.message = error.message;
      }
      return result;
    }
  },
  Mutation: {
    createCategory: async (_, { input }, { dataSources: { Category }, user }) => {
      let result: IResultDoc = {
        status: 200,
        message: 'Success'
      };
      try {
        const createdDocument = await Category.create(input, TTL_FOR_ID);
        result.data = createdDocument;
      } catch (err) {
        result.status = 400;
        result.message = err.message;
      }
      return result;
    },
    updateCategory: async (_, { input }, { dataSources: { Category }, user }) => {
      let result: IResultDoc = {
        status: 200,
        message: 'Success'
      };
      try {
        const { _id } = input;
        // Check exist document
        const existingDoc: ICategory = await Category.findOneById(_id, { ttl: TTL_FOR_ID });
        if (!existingDoc) throw new Error('Category not exist');

        const docs = await Category.update(input, TTL_FOR_ID);

        result.data = docs;
      } catch (err) {
        result.status = 400;
        result.message = err.message;
      }
      return result;
    },
    removeCategory: async (_, { _id }, { dataSources: { Category }, user, logger }) => {
      let result: IResultDoc = {
        status: 200,
        message: 'Removed success'
      };
      try {
        // Check exist document
        const existingDoc: ICategory = await Category.findOneById(_id, { ttl: TTL_FOR_ID });
        if (!existingDoc) throw new Error('Category not exist');

        await Category.remove({ _id });
        logger.warn(`User (${user?.username || user?._id}) removed category id: ${_id}`);
      } catch (error) {
        result.status = 400;
        result.message = error.message;
      }
      return result;
    }
  }
};

export default resolvers;
