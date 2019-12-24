// Initializes the `signatures` service on path `/signatures`
const { Signatures } = require('./signatures.class');
const createModel = require('../../models/signatures.model');
const hooks = require('./signatures.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    id: 'signature'
  };

  // Initialize our service with any options it requires
  app.use('/signatures', new Signatures(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('signatures');

  service.hooks(hooks);
};
