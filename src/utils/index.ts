const cleanObject = (object: any) => {
  Object.entries(object).forEach(([k, v]: any) => {
    if (v && typeof v === 'object') cleanObject(v);
    if ((v && typeof v === 'object' && !Object.keys(v).length) || v === null || v === undefined || v.length === 0) {
      if (Array.isArray(object)) object.splice(k, 1);
      else if (!(v instanceof Date)) delete object[k];
    }
  });
  return object;
};

const isLogicalQuery = (key: string) => {
  return ['or', 'nor', 'not', 'and'].includes(key);
};

const isRegexQuery = (key: string) => {
  return ['regex'].includes(key);
};

const processQueryCondition = (filter = {}) => {
  return Object.entries(filter).reduce((acc: any, [key, operators]) => {
    if (isLogicalQuery(key)) {
      return {
        ...acc,
        [`$${key}`]: processFieldLogical(operators)
      };
    }
    return {
      ...acc,
      [key]: processFieldComparison(operators)
    };
  }, {});
};

const getPageInfo = (docCount: number, limit: number, skip: number) => {
  const totalPage = limit > 0 ? Math.ceil(docCount / limit) || 1 : 0;
  // const currentPage = Math.ceil((skip + 1) / limit);
  const currentPage = skip + 1;

  return {
    limit,
    totalDocs: docCount,
    totalPage,
    currentPage,
    hasNextPage: currentPage < totalPage,
    hasPreviousPage: currentPage > 1
  };
};

const processFieldComparison = (operators: any) => {
  return Object.entries(operators).reduce((acc, [operator, value]) => {
    let newOperator: any = {
      ...acc,
      ['$' + operator]: value
    };
    if (isRegexQuery(operator)) {
      newOperator['$options'] = 'i';
    }
    return newOperator;
  }, {});
};

const processFieldLogical = (filter: any) => {
  return filter.reduce((acc: any, item: any) => {
    return [...acc, processQueryCondition(item)];
  }, []);
};

const intersection = (arrA: string[], arrB: string[]) => arrA.filter((x) => arrB.includes(x));
const difference = (arrA: string[], arrB: string[]) => arrA.filter((x) => !arrB.includes(x));

export {
  cleanObject,
  isLogicalQuery,
  processQueryCondition,
  processFieldComparison,
  processFieldLogical,
  getPageInfo,
  intersection,
  difference
};
