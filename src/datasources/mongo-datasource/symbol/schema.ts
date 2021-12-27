import generateModel from '../../generates/generateModel';

const schema: any = {
  code: { type: String, required: true, unique: true },
  companyName: { type: String, required: true },
  companyNameEn: String,
  exchange: { type: String, required: true },
  shortName: String,
  status: {
    type: String,
    default: 'active'
  }
};

export default generateModel({
  schema,
  modelName: 'Symbol',
  collectionName: 'symbols'
});
