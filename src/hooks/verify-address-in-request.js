// eslint-disable-next-line no-unused-vars
const { BadRequest } = require('@feathersjs/errors');
const logger = require('../logger');

module.exports = () => {
  return async context => {

    if (!context.data || !context.data.walletAddress ||  context.data.walletAddress !== context.params.walletAddress) {
      logger.error('wallet address in data not found or is different than signature');
      throw new BadRequest();
    }

    return context;
  };
};
