// eslint-disable-next-line no-unused-vars
const { NotAuthenticated } = require('@feathersjs/errors');
const logger = require('../logger');

module.exports = () => {
  return async context => {

    const walletAddress = context.params.walletAddress;
    try {
      const res = await context.app.service('users').find({ query: { wallet_address: walletAddress } });
      if (!res.data[0]) {
        logger.error('no user found');
        throw new NotAuthenticated();
      }
      delete context.params.walletAddress;
      context.params.user = res.data[0];
      return context;
    } catch (err) {
      logger.error('no user found');
      throw new NotAuthenticated();
    }
  };
};
