module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const transactions = new Schema({
    fromAddress: { type: String, required: true },
    fromUsername: String,
    toAddress: { type: String, required: true },
    toUsername: String,
    amountInBasicUnit: { type: String, required: true },
    currency: { type: String, required: true },
    transactionHash: { type: String, required: true, unique: true },
    note: String,
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('transactions');
  } catch (e) {
    return mongooseClient.model('transactions', transactions);
  }
};
