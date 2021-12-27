import mongoose from 'mongoose';
require('dotenv').config();

mongoose.Promise = global.Promise;

export const connect = async ({
  host = process.env.MONGO_DEFAULT_HOST,
  port = process.env.MONGO_DEFAULT_PORT,
  dbName = process.env.MONGO_DEFAULT_DB_NAME,
  user = process.env.MONGO_DEFAULT_USER,
  pass = process.env.MONGO_DEFAULT_PASS
}: any = {}) => {
  let mongoURL = `mongodb://${host}:${port}/${dbName}`;
  if (user && pass) {
    mongoURL = `mongodb://${user}:${pass}@${host}:${port}/${dbName}?authSource=admin&w=1`;
  }
  console.log('mongoURL: ', mongoURL);
  await mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  return mongoose;
};

export default mongoose;
