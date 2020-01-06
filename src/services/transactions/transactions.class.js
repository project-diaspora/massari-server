const { Service } = require('feathers-mongoose');

exports.Transactions = class Transactions extends Service {
  
  find(params) {

    if (params.provider) {
      params = {
        query: {
          $or: [
            { fromAddress: params.user.walletAddress },
            { toAddress: params.user.walletAddress }
          ]
        }
      };
    }

    return super.find(params);
  }
  
};
