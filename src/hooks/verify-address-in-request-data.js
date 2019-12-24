// eslint-disable-next-line no-unused-vars
const { BadRequest } = require('@feathersjs/errors');
const logger = require('../logger');

module.exports = () => {
  return async context => {

    if (context.params.data.walletAddress !== context.params.walletAddress) {
      logger.error('wallet address in data is different than signature');
      throw new BadRequest();
    }

    return context;
  };
};
