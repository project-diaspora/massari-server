const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = function (app) {

  const mongodbUrl = `mongodb+srv://${app.get('mongodbUsername')}:${app.get('mongodbPassword')}@${app.get('mongodbCluster')}/${app.get('mongodbDb')}`;

  mongoose.connect(
    mongodbUrl,
    { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true}
  ).catch(err => {
    logger.error(err);
    process.exit(1);
  });
  
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
