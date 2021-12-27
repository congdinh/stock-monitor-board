const TYPEOF_COLLECTION = 'object';

export const isModel = (x: any) => Boolean(x && x.name === 'model');

export const isCollectionOrModel = (x: any) => Boolean(x && (typeof x === TYPEOF_COLLECTION || isModel(x)));

export const getCollection = (x: any) => (isModel(x) ? x.collection : x);
