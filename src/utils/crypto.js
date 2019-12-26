const ethers = require('ethers');

module.exports = {

  verifyMessage: async (signedMessage, signature) => {
    return ethers.utils.verifyMessage(signedMessage, signature);
  },

};