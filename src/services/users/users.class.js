const { Service } = require('feathers-mongoose');
const { BadRequest } = require('@feathersjs/errors');
const logger = require('../../logger');

exports.Users = class Users extends Service {

  create(data, params) {

    if (!/^[a-zA-Z0-9]*$/.test(data.username)) {
      logger.error('Only alphanumericals in username');
      throw new BadRequest('Only alphanumericals in username');
    }

    if (2 <= data.username.length <= 20) {
      logger.error('Username length invalid (min: 2, max: 20)');
      throw new BadRequest('Username length invalid (min: 2, max: 20)');
    }

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
