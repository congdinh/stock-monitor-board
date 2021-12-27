import { Schema } from 'mongoose';
import mongoose from '../../external-libs/mongoose';

require('dotenv').config();
const collectionPrefix = process.env.MONGO_COLLECTION_PREFIX;

interface IGenerateModel {
  schema: Schema;
  modelName: string;
  collectionName: string;
}
export default ({ schema, modelName, collectionName }: IGenerateModel) => {
  let NewSchema = new Schema(schema, {
    collection: `${collectionPrefix}_${collectionName}`,
    versionKey: false,
    strict: false,
    timestamps: true
  });

  return mongoose.model(modelName, NewSchema);
};
