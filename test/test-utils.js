const ethers = require('ethers');

module.exports = {

  signMessage: async (message, mnemonic) => {
    const wallet = new ethers.Wallet.fromMnemonic(mnemonic);
    return await wallet.signMessage(message);
  },

  generateMnemonic: () => {
    let wallet = ethers.Wallet.createRandom();
    return wallet.mnemonic;
  },

  validateMnemonic: (mnemonic) => {
    return ethers.utils.HDNode.isValidMnemonic(mnemonic);
  },

  getWalletAddress: (mnemonic) => {
    const wallet = new ethers.Wallet.fromMnemonic(mnemonic);
    return wallet.address;
  },

};

