require('dotenv').config();
import Redis, { RedisOptions } from 'ioredis';

export const RedisConfigOption: RedisOptions = {
  host: process.env.REDIS_DEFAULT_HOST,
  port: parseInt(process.env.REDIS_DEFAULT_PORT || '6379'),
  db: parseInt(process.env.REDIS_DEFAULT_DB_NAME || '0'),
  retryStrategy: (options: any) => {
    return Math.max(options.attempt * 100, 3000);
  }
};
const redis = new Redis(RedisConfigOption);

export default redis;
