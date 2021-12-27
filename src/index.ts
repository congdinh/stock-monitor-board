import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import compression from 'compression';
// import get from 'lodash.get';

import { RedisCache } from 'apollo-server-cache-redis';
import { RedisConfigOption } from './external-libs/redis';

import schema from './graphql';
import generateDS from './datasources';

import Logger from './external-libs/winston';

import { connect as connectMongoDB } from './external-libs/mongoose';

require('dotenv').config();

const {
  PORT,
  APOLLO_PLAYGROUND,
  APOLLO_INTROSPECTION,
  APOLLO_DEBUG,
  APOLLO_TRACING,
  APOLLO_PATH,
  APOLLO_SUBSCRIPTION_PATH,
  SERVER_REQUEST_WHITE_LIST,
  SERVER_CORS_ENABLED
} = process.env;

const port = parseInt(PORT || '9013', 10);
const playground = APOLLO_PLAYGROUND === 'true';
const introspection = APOLLO_INTROSPECTION === 'true';
const debug = APOLLO_DEBUG === 'true';
const tracing = APOLLO_TRACING === 'true';
const path = APOLLO_PATH || '/graphql';
const subPath = APOLLO_SUBSCRIPTION_PATH || '/graphql';

const whitelist = SERVER_REQUEST_WHITE_LIST || '';
const corsEnabled = SERVER_CORS_ENABLED === 'true';

async function init() {
  const app = express();

  const logger = new Logger({ route_name: 'stock-monitor' });

  // parse application/json
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
  app.use(bodyParser.json({ limit: '50mb' }));

  let corsOptions: any = {
    origin: function (origin: string, callback: any) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed access!'));
      }
    }
  };

  const loggingMiddleware: any = (req: any, res: any, next: any) => {
    if (req.body.operationName && !['IntrospectionQuery'].includes(req.body.operationName)) {
      const getIP =
        (req.headers['X-Forwarded-For'] || req.headers['x-forwarded-for'] || '').split(',')[0] ||
        req.client.remoteAddress;
      const ip = (getIP.length < 15 && getIP) || getIP.slice(7) || req.ip;
      const { query, ...body } = req.body;
      logger.info(`[GraphQL.request] ${ip}`, body);
    }
    next();
  };

  if (!corsEnabled) {
    corsOptions = {};
  }

  app.use(compression());
  app.use(cors(corsOptions));
  app.use(loggingMiddleware);

  // TODO Enable CORS
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Access-Control-Request-Method'
    );
    next();
  });

  // error handler
  app.use((err: any, req: any, res: any, next: any) => {
    // render the error page
    // logger.error(err.message);
    res.status(err.status || 500);
    res.json({ message: 'Not allowed access!' });
  });

  // This is where we define the dataSources which can be
  // used to retrieve data from the resolvers.
  const dataSources = (): any => {
    return {
      ...generateDS
    };
  };

  // the function that sets up the global context for each resolver, using the req
  const context = async ({ req, res }: any) => {
    // simple auth check on every request
    const user = req?.headers?.user ? JSON.parse(req.headers.user) : null;
    return {
      user
    };
  };

  // Append apollo to our API
  const server = new ApolloServer({
    schema,
    dataSources,
    cache: new RedisCache(RedisConfigOption),
    context,
    validationRules: [depthLimit(7)],
    tracing,
    introspection,
    playground,
    debug,
    formatError: (error) => {
      // filter whatever errors your don't want to log
      logger.error(`[GraphQL.error]`, error);
      return {
        message: error.message,
        errorCode: (error.extensions && error.extensions.code) || null,
        extensions: { ...error.extensions }
      };
    },
    // formatResponse: (response: any) => {
    //   // don't log auth mutations or schema requests
    //   const name = Object.keys(get(response, 'data') || { unknown: 0 })[0];
    //   if (!['__schema'].includes(name)) {
    //     logger.info(`"[GraphQL.response] ${name}",body:` + JSON.stringify(response));
    //   }
    //   return response;
    // },
    subscriptions: {
      path: subPath,
      onConnect: async (connectionParams: any, webSocket: any) => {
        if (corsEnabled) {
          const origin = webSocket.upgradeReq.headers.origin;
          const realIP = webSocket.upgradeReq.headers['x-real-ip'];
          if (!origin) {
            logger.error('Origin', origin + ' ' + realIP);
            return false;
          }
          if (whitelist.indexOf(origin) === -1) {
            logger.error('Origin not in whitelist', origin + ' ' + realIP);
            return false;
          }
        }
        return true;
      }
    }
  });

  server.applyMiddleware({ app, path, cors: false });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  return connectMongoDB()
    .then(() => {
      logger.info('Mongo connect successful!');
      // The `listen` method launches a web server.
      httpServer.listen(port, () => {
        logger.info(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
        logger.info(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
        logger.info(
          `Try your health check at: http://localhost:${port}${server.graphqlPath}/.well-known/apollo/server-health`
        );
      });
    })
    .catch((error) => {
      logger.error('Starting server', error);
      process.exit(1);
    });
}

init();
