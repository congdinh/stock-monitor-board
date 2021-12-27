import { shield, and, or } from 'graphql-shield';
import { ApolloError } from 'apollo-server-express';
import {
  isAuthenticated,
  isStockAdmin,
  isStockBusiness,
  isStockManager,
  isStockAnalysis,
  isStockCustomer,
  isStockGuest,
  isSuperAdmin
} from './rules';

export default shield(
  {},
  {
    fallbackError: (thrownThing, parent, args, context, info) => {
      if (thrownThing instanceof ApolloError) {
        return thrownThing;
      } else if (thrownThing instanceof Error) {
        return new ApolloError(thrownThing.message, 'ERR_INTERNAL_SERVER');
      } else {
        console.log('thrownThing------', thrownThing);
        return new ApolloError('Internal server error', 'ERR_INTERNAL_SERVER');
      }
    },
    debug: false
  }
);
