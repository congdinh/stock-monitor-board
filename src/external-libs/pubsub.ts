require('dotenv').config();
import Redis, { RedisOptions } from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';

const options: RedisOptions = {
  host: process.env.REDIS_DEFAULT_HOST,
  port: parseInt(process.env.REDIS_DEFAULT_PORT || '6379'),
  db: parseInt(process.env.REDIS_DEFAULT_DB_NAME || '0'),
  retryStrategy: (options: any) => {
    return Math.max(options.attempt * 100, 3000);
  }
};

const optionPubSub: RedisOptions = {
  ...options,
  enableOfflineQueue: false,
  autoResubscribe: true,
  autoResendUnfulfilledCommands: true,
  maxRetriesPerRequest: 1
};

export default new RedisPubSub({
  publisher: new Redis(optionPubSub),
  subscriber: new Redis(optionPubSub)
});
