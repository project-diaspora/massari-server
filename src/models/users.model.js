module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const users = new Schema({
    username: { type: String, required: true, unique: true },
    walletAddress: { type: String, required: true, unique: true },
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('users');
  } catch (e) {
    return mongooseClient.model('users', users);
  }
};
