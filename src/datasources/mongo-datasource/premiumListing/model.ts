import { MongoDataSource, IMongoDataSource } from '../../generates';
import { IPremiumListing, IFilterQuery } from '../../../common/interface';

import { SHARED_STATUS } from '../../../configs/constant';

import { processQueryCondition, getPageInfo } from '../../../utils';

export default class ModelDataSource extends MongoDataSource {
  initialize(config: IMongoDataSource) {
    super.initialize({
      ...config,
      debug: false
    });
  }

  async filterAndPaging({ orderBy, where, limit, skip, select }: IFilterQuery, ttl: number) {
    const sort = orderBy;
    let result: any = {};
    let conditions = processQueryCondition(where);
    conditions = {
      status: { $ne: SHARED_STATUS.DELETED },
      ...conditions
    };
    const [docs, countDocument] = await Promise.all([
      this.findManyByQueryAndOption(
        {
          query: conditions,
          select,
          option: { sort, limit, skip: skip * limit }
        },
        { ttl }
      ),
      this.collection.countDocuments(conditions)
    ]);

    result.pageInfo = getPageInfo(countDocument, limit, skip);
    result.data = docs;
    return result;
  }

  async create(input: IPremiumListing, ttl: number) {
    const newDoc = new this.collection(input);
    const saveDoc = await newDoc.save();

    await this.deleteManyFromQueryCollectionCache();
    const cacheDoc = await this.findOneById(saveDoc._id, {
      ttl
    });

    return cacheDoc;
  }

  async update({ _id, ...info }: IPremiumListing, ttl: number) {
    const updatedDoc = await this.collection
      .update(
        { _id },
        {
          ...info
        }
      )
      .lean()
      .exec();

    if (!updatedDoc || (updatedDoc && updatedDoc.nModified === 0)) {
      throw new Error('Cannot update, plz try update again');
    }

    await this.deleteFromCacheById(_id);
    await this.deleteManyFromQueryCollectionCache();

    const cacheDoc = await this.findOneById(_id, {
      ttl
    });

    return cacheDoc;
  }

  async remove({ _id }: IPremiumListing) {
    await this.collection.deleteOne({ _id });
    await this.deleteFromCacheById(_id);
    await this.deleteManyFromQueryCollectionCache();
  }
}
