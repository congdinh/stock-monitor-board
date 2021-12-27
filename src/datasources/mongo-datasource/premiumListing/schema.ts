import generateModel from '../../generates/generateModel';

const schema: any = {
  symbol: { type: String, required: true },
  code: { type: String, required: true },
  sequence: Number,
  type: Number,
  content: String,
  status: {
    type: String,
    default: 'active'
  }
};

export default generateModel({
  schema,
  modelName: 'PremiumListing',
  collectionName: 'premium_listings'
});
