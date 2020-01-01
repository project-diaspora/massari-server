const { Service } = require('feathers-mongoose');

exports.Users = class Users extends Service {

  create(data, params) {

    data = {
      username: data.username.toLowerCase(),
      walletAddress: params.walletAddress
    };
    return super.create(data, params);
  }

  find(params) {

    if (params.provider) {
      params = { 
        query: {
          walletAddress: params.walletAddress
        }
      };
    }

    return super.find(params);
  }

};
