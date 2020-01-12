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
            { toAddress: params.user.walletAddress },
            { fromUsername: params.user.username },
            { toUsername: params.user.username }
          ]
        }
      };
    }
    return super.find(params);
  }
  
};
