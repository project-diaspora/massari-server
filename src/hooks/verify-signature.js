// eslint-disable-next-line no-unused-vars
const { NotAuthenticated, BadRequest } = require('@feathersjs/errors');
const ethers = require('ethers');
const logger = require('../logger');

module.exports = () => {
  return async context => {

    let xSignature, xTimestamp, xUrl;

    try {
      xSignature = context.params.headers['x-massari-signature'];
      xTimestamp = context.params.headers['x-massari-timestamp'];
      if (context.id) {
        xUrl = `${context.path}/${context.id}`;
      } else {
        xUrl = `${context.path}`;
      }
    } catch (err) {
      logger.error('missing params');
      throw new BadRequest();
    }

    context = await getAddressFromSignature({ context, xSignature, xUrl, xTimestamp });
    verifyTimestamp({ xTimestamp });

    return context;
  };
};

const getAddressFromSignature = async ({ context, xSignature, xUrl, xTimestamp }) => {
  const signedMessage = `${xUrl}|${xTimestamp}`;
  const signedWithWallet = ethers.utils.verifyMessage(signedMessage, xSignature);
  context.params.walletAddress = signedWithWallet;
  return context;
};

const verifyTimestamp = ({ xTimestamp }) => {
  // check if timestamp < 2 minutes
  if (Date.now() - Number(xTimestamp) > 2 * 60 * 1000) {
    logger.error('timestamp check failed');
    throw new NotAuthenticated();
  }
  return;
};
