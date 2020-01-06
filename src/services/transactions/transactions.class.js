const { Service } = require('feathers-mongoose');

exports.Transactions = class Transactions extends Service {

  create(data, params) {
    if (params.provider) {
      data = {
        ...data,
        fromUsername: params.user.username,
        fromAddress: params.user.walletAddress
      };
    }
    return super.create(data, params);
  }

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
