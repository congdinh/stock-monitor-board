const USER_ROLE = {
  SUPERADMIN: 1,
  ADMIN: 2,
  MANAGER: 3,
  PREMIUM: 4,
  GUEST: 5
};

const SHARED_STATUS = {
  INACTIVE: 'inactive',
  ACTIVE: 'active',
  DEACTIVE: 'deactive',
  DELETED: 'deleted'
};

const TTL_FOR_QUERY: number = 60 * 15;
const TTL_FOR_ID: number = 60 * 30;
const MAXIMUM_LIMIT_SIZE = 500;
const TTL_FOR_AGGS: number = 60 * 5;

const cacheStockPrefix = `stock:monitor:`;
const cacheStockSymbol = `${cacheStockPrefix}symbol:`;
const cacheStockExchange = `${cacheStockPrefix}exchange:`;

const EXCHANGES = {
  VN30: 'vn30',
  HNX30: 'hnx30',
  HOSE: 'hose',
  HNX: 'hnx',
  UPCOM: 'upcom',
  DERIVATIVES: 'derivatives'
};

const TOP_STOCK_SORT = {
  PRICE_CHANGE: 'priceChange',
  PRICE_CHANGE_PERCENT: 'priceChangePercent',
  FOREIGN_B: 'foreignB',
  FOREIGN_S: 'foreignS',
  TOTAL_VOL: 'totalVol'
};

const SORT_TYPE = {
  DESC: 'desc',
  ASC: 'asc'
};

const PREMIUM_TYPE = {
  HOT: 1,
  VIP: 2
};

const CATEGORY_TYPE = {
  OPTIONAL: 1,
  PRIMARY: 2,
  RANDOM: 3
};

export {
  USER_ROLE,
  TTL_FOR_QUERY,
  TTL_FOR_ID,
  TTL_FOR_AGGS,
  MAXIMUM_LIMIT_SIZE,
  EXCHANGES,
  TOP_STOCK_SORT,
  SORT_TYPE,
  SHARED_STATUS,
  PREMIUM_TYPE,
  CATEGORY_TYPE,
  cacheStockPrefix,
  cacheStockSymbol,
  cacheStockExchange
};
