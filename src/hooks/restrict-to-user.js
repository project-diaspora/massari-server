const { BadRequest } = require('@feathersjs/errors');
const logger = require('../logger');

// eslint-disable-next-line no-unused-vars
module.exports = () => {
  return async context => {

    if (context.params.user.username !== context.data.fromUsername) {
      logger.error('creating a transaction from another user');
      throw new BadRequest();
    }

    if (context.params.user.walletAddress !== context.data.fromAddress) {
      logger.error('creating a transaction from another wallet');
      throw new BadRequest();
    }

    return context;
  };
};
