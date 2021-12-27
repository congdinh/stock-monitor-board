import generateModel from '../../generates/generateModel';

const schema: any = {
  name: { type: String, required: true, unique: true },
  code: { type: String, unique: true },
  nameEn: String,
  sequence: Number,
  symbols: String,
  title: String,
  description: String,
  type: Number,
  status: {
    type: String,
    default: 'active'
  }
};

export default generateModel({
  schema,
  modelName: 'Category',
  collectionName: 'categories'
});
