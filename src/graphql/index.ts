import { gql } from 'apollo-server-express';
import isPlainObject from 'lodash.isplainobject';
import forEach from 'lodash.foreach';
import { buildFederatedSchema } from '@apollo/federation';
import { applyMiddleware } from 'graphql-middleware';
import permissions from './acl';
import Stocks from './stocks';
import Categories from './category';
import Symbols from './symbols';
import PremiumListing from './premiumListing';

import { EXCHANGES, TOP_STOCK_SORT, SORT_TYPE, SHARED_STATUS, PREMIUM_TYPE, CATEGORY_TYPE } from '../configs/constant';

const initTypeDefs: any = gql`
  scalar Date

  enum ExchangeType {
    ${Object.keys(EXCHANGES).join('\n')}
  }
  enum TopStockSort {
    ${Object.keys(TOP_STOCK_SORT).join('\n')}
  }
  enum SortType {
    ${Object.keys(SORT_TYPE).join('\n')}
  }
  enum SharedStatus {
    ${Object.keys(SHARED_STATUS).join('\n')}
  }
  enum PremiumType {
    ${Object.keys(PREMIUM_TYPE).join('\n')}
  }
  enum CategoryType {
    ${Object.keys(CATEGORY_TYPE).join('\n')}
  }

  type PageInfo {
    """
    Amount of data per page
    """
    limit: Int
    """
    Total data
    """
    totalDocs: Int
    """
    Total Page
    """
    totalPage: Int
    """
    Current Page, start from 1.
    """
    currentPage: Int
    """
    Boolean next page
    """
    hasNextPage: Boolean!
    """
    Boolean previous page
    """
    hasPreviousPage: Boolean!
  }
  input QueryBooleanInput {
    """
    Equal
    """
    eq: Boolean
    """
    Not Equal
    """
    ne: Boolean
  }

  input QueryStatusInput {
    """
    Equal
    """
    eq: SharedStatus
    """
    Regex Match
    """
    regex: SharedStatus
    """
    Not Equal
    """
    ne: SharedStatus
    """
    In
    """
    in: [SharedStatus]
    """
    Not In
    """
    nin: [SharedStatus]
  }

  input QueryStringInput {
    """
    Equal
    """
    eq: String
    """
    Regex Match
    """
    regex: String
    """
    Not Equal
    """
    ne: String
    """
    In
    """
    in: [String]
    """
    Not In
    """
    nin: [String]
  }

  input QueryIntInput {
    """
    Equal
    """
    eq: Int
    """
    Not Equal
    """
    neq: Int
    """
    Greater Than
    """
    gt: Int
    """
    Greater Than Equal
    """
    gte: Int
    """
    Less Than
    """
    lt: Int
    """
    Less Than Equal
    """
    lte: Int
    """
    In
    """
    in: [Int]
    """
    Not In
    """
    nin: [Int]
  }

`;

const initResolvers = {
  ExchangeType: {
    ...EXCHANGES
  },
  TopStockSort: {
    ...TOP_STOCK_SORT
  },
  SortType: {
    ...SORT_TYPE
  },
  SharedStatus: {
    ...SHARED_STATUS
  },
  PremiumType: {
    ...PREMIUM_TYPE
  },
  CategoryType: {
    ...CATEGORY_TYPE
  }
};

const federationSources: any = [
  {
    typeDefs: initTypeDefs,
    resolvers: initResolvers
  },
  Stocks,
  Categories,
  Symbols,
  PremiumListing
];

const schema: any = buildFederatedSchema(federationSources);

// Hooray! Monkey-patching!
federationSources.forEach(({ resolvers }: any) => {
  if (resolvers.Subscription) {
    forEach(resolvers.Subscription, (resolver: any, field: any) => {
      if (isPlainObject(resolver) && resolver.subscribe) {
        const target = schema._subscriptionType?._fields[field];
        // Ensure everything is still as bad, as we expect
        if (target?.subscribe) {
          throw new Error('The library might be fixed. Delete this patch.');
        }

        // Do patch
        if (target) {
          target.subscribe = resolver.subscribe;
        }
        if (target && !target.resolve) {
          target.resolve = (x: any) => x;
        }
      }
    });
  }
});

export default applyMiddleware(schema, permissions);
