// eslint-disable-next-line no-unused-vars
const { BadRequest } = require('@feathersjs/errors');
const logger = require('../logger');

module.exports = () => {
  return async context => {
    
    const xSignature = context.params.headers['x-massari-signature'];

    try {
      await context.app.service('signatures').create({ signature: xSignature });
    } catch (err) {
      logger.error(err);
      throw new BadRequest('bad signature');
    }

    return context;
  };
};