import { GoogleSpreadsheet } from 'google-spreadsheet';
import PremiumListing from '../datasources/mongo-datasource/premiumListing';
import CategoryModel from '../datasources/mongo-datasource/category';
import { connect as connectMongoDB } from '../external-libs/mongoose';
import redis from '../external-libs/redis';
import Logger from '../external-libs/winston';
import { cleanObject } from '../utils';

import { PREMIUM_TYPE, SHARED_STATUS, CATEGORY_TYPE } from '../configs/constant';

const logger = new Logger({ route_name: 'sync-stock' });

const creds = {};

async function deleteManyFromQueryCollectionCache() {
  const stream = redis.scanStream({
    match: `mongo:col_premium_listings:*`
  });
  stream.on('data', (keys: string[]) => {
    // `keys` is an array of strings representing key names
    if (keys.length) {
      const pipeline = redis.pipeline();
      keys.forEach((key) => {
        pipeline.del(key);
      });
      pipeline.exec();
    }
  });
  stream.on('end', () => {
    logger.info(`Deleted Cache`);
  });
  return 'ok';
}

async function deleteManyCategoryFromQueryCollectionCache() {
  const stream = redis.scanStream({
    match: `mongo:col_categories:*`
  });
  stream.on('data', (keys: string[]) => {
    // `keys` is an array of strings representing key names
    if (keys.length) {
      const pipeline = redis.pipeline();
      keys.forEach((key) => {
        pipeline.del(key);
      });
      pipeline.exec();
    }
  });
  stream.on('end', () => {
    logger.info(`Deleted Cache`);
  });
  return 'ok';
}

const syncSheet1 = async (doc: any) => {
  const sheet1 = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

  // read rows
  const rows = await sheet1.getRows(); // can pass in { limit, offset }

  if (rows.length) {
    let params: any = [];
    // Print
    rows.forEach((row, i) => {
      logger.info(`STT: ${row.stt} - VIP: ${row.vip} (${row.content_vip}) - HOT: ${row.hot} (${row.content_hot})`);
      if (row.vip) {
        const objVip = {
          symbol: row.vip,
          code: row.vip,
          sequence: i + 1,
          type: PREMIUM_TYPE.VIP,
          content: row.content_vip || null,
          status: SHARED_STATUS.ACTIVE
        };
        params.push(objVip);
      }
      if (row.hot) {
        const objHot = {
          symbol: row.hot,
          code: row.hot,
          sequence: i + 1,
          type: PREMIUM_TYPE.HOT,
          content: row.content_hot || null,
          status: SHARED_STATUS.ACTIVE
        };
        params.push(objHot);
      }
    });
    if (params.length === 0) return true;

    // console.log('params: ', params);
    await deleteManyFromQueryCollectionCache();

    await PremiumListing.collection.deleteMany({});
    const syncList = await PremiumListing.collection.create(params);
    logger.info('syncList: ', syncList.length);
  } else {
    logger.warn('No data found.');
  }
  return true;
};

const syncSheet2 = async (doc: any) => {
  try {
    const sheet1 = doc.sheetsByIndex[1]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

    // read rows
    let rows = await sheet1.getRows(); // can pass in { limit, offset }
    if (rows.length) {
      let params: any = [];
      // Print
      await rows.forEach((row, i) => {
        // logger.info('Category', row);
        const obj = {
          name: row.category_name.trim(),
          code: row.category_code.trim(),
          symbols: row.symbols.replace(/\s+/g, ''),
          title: row.title,
          description: row.description,
          type: row.category_type ? CATEGORY_TYPE[row.category_type] : CATEGORY_TYPE.RANDOM
        };
        params.push(obj);
      });
      logger.info('Category', params);
      if (params.length === 0) return true;
      await deleteManyCategoryFromQueryCollectionCache();

      // const cleanDesc = await CategoryModel.collection.updateMany(
      //   {},
      //   { $unset: { title: '', description: '', type: '' } }
      // );
      // logger.info('cleanDesc: ', cleanDesc);

      await params.forEach(async (category: any) => {
        await CategoryModel.collection.findOneAndUpdate(
          { code: category.code },
          { $set: cleanObject(category) },
          { upsert: true, new: true, lean: true }
        );
      });
      logger.info('syncListCategory: ', params.length);
    } else {
      logger.warn('No data found.');
    }
  } catch (error) {
    logger.error('syncSheet2', error);
  }
  return true;
};

const run = async () => {
  connectMongoDB().then(async () => {
    try {
      // Initialize the sheet - doc ID is the long id in the sheets URL
      const doc = new GoogleSpreadsheet('1oh0HYc0pE7zPJPVy7_1_m1qFojeIpH8Sw2fOe3e3ayk');

      await doc.useServiceAccountAuth(creds);
      await doc.loadInfo(); // loads document properties and worksheets
      await syncSheet1(doc);
      await syncSheet2(doc);
    } catch (error) {
      logger.error('Error', error);
    }
    return true;
  });
};

run();
