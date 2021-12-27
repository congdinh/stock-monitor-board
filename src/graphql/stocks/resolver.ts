import { IResolvers } from 'graphql-tools';
import { withFilter } from 'apollo-server-express';

import pubsub from '../../external-libs/pubsub';
import Redis from '../../external-libs/redis';
import { cacheStockSymbol, cacheStockExchange } from '../../configs/constant';

import { IResults, IExchangeResults } from '../../common/interface';

const resolvers: IResolvers = {
  Stock: {
    id: root => root.symbol.toLowerCase()
  },
  Query: {
    stocks: async (_, { symbols }) => {
      let result: IResults = {
        status: 200,
        message: 'Success',
        data: []
      };
      try {
        if (!symbols?.length) throw new Error('Require input symbols');
        const pipeline = Redis.pipeline();
        symbols.forEach((symbol: string) => pipeline.hgetall(`${cacheStockSymbol}${symbol}`));
        const data = await pipeline.exec();
        result.data = data.map(item => item[1]).filter(item => item.symbol);
      } catch (error) {
        result.status = 400;
        result.message = error.message;
      }
      return result;
    },
    stockByExchange: async (_, { exchange }) => {
      let result: IResults = {
        status: 200,
        message: 'Success',
        data: []
      };
      try {
        if (!exchange) throw new Error('Require input exchange');
        const symbols = (await Redis.smembers(`${cacheStockExchange}${exchange}`)) || [];
        if (!symbols?.length) throw new Error('No symbol in exchange');
        const pipeline = Redis.pipeline();
        symbols.forEach((symbol: string) => pipeline.hgetall(`${cacheStockSymbol}${symbol}`));
        const data = await pipeline.exec();
        result.data = data.map(item => item[1]).filter(item => item.symbol);
      } catch (error) {
        result.status = 400;
        result.message = error.message;
      }
      return result;
    },
    exchanges: async (_, { exchange }) => {
      let result: IExchangeResults = {
        status: 200,
        message: 'Success',
        data: []
      };
      try {
        if (!exchange) throw new Error('Require input exchange');
        const symbols = (await Redis.smembers(`${cacheStockExchange}${exchange}`)) || [];
        if (!symbols?.length) throw new Error('No symbol in exchange');
        result.data = symbols;
      } catch (error) {
        result.status = 400;
        result.message = error.message;
      }
      return result;
    },
    topStockByExchange: async (_, { input }) => {
      let result: IResults = {
        status: 200,
        message: 'Success',
        data: []
      };
      try {
        const { exchange, sortField = 'priceChangePercent', sortType = 'desc', size = 10 } = input;

        if (!exchange) throw new Error('Require input exchange');
        const symbols = (await Redis.smembers(`${cacheStockExchange}${exchange}`)) || [];
        if (!symbols?.length) throw new Error('No symbol in exchange');

        const pipeline = Redis.pipeline();
        symbols.forEach((symbol: string) => pipeline.hgetall(`${cacheStockSymbol}${symbol}`));
        const data = await pipeline.exec();

        const dataFilter = data.map(item => item[1]).filter(item => item.symbol);

        const dataSort = dataFilter.sort((a, b) => {
          const parseA = parseFloat(a[sortField]) || 0;
          const parseB = parseFloat(b[sortField]) || 0;
          if (sortType === 'asc') return parseA - parseB;
          else return parseB - parseA;
        });
        const dataMapping = dataSort.slice(0, size);

        result.data = dataMapping;
      } catch (error) {
        result.status = 400;
        result.message = error.message;
      }
      return result;
    }
  },
  Subscription: {
    stockChanged: {
      // Additional event labels can be passed to asyncIterator creation
      resolve: payload => payload.data,
      subscribe: withFilter(
        () => pubsub.asyncIterator('STOCK_CHANGED'),
        (payload, variables, { user }) => {
          return variables.symbols.includes(payload.data.symbol);
        }
      )
    },
    exchangeChanged: {
      // Additional event labels can be passed to asyncIterator creation
      resolve: payload => payload.data,
      subscribe: withFilter(
        () => pubsub.asyncIterator('EXCHANGE_CHANGED'),
        (payload, variables, { user }) => {
          return payload.exchange === variables.exchange;
        }
      )
    },
    stockChangedByExchange: {
      // Additional event labels can be passed to asyncIterator creation
      resolve: payload => payload.data,
      subscribe: withFilter(
        () => pubsub.asyncIterator('STOCK_CHANGED_EXCHANGE'),
        async (payload, variables) => {
          // check only 2 exchanges (vn30, hnx30)
          if (['vn30', 'hnx30'].includes(variables.exchange)) {
            const symbols = (await Redis.smembers(`${cacheStockExchange}${variables.exchange}`)) || [];
            if (!symbols?.length) throw new Error('No symbol in exchange');
            return symbols.includes(payload.data.symbol);
          }
          return payload.exchange === variables.exchange;
        }
      )
    }
  }
};

export default resolvers;
