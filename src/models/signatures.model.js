module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const signatures = new Schema({
    signature: { type: String, required: true, unique: true }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('signatures');
  } catch (e) {
    return mongooseClient.model('signatures', signatures);
  }
};
