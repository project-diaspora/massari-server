const { Service } = require('feathers-mongoose');

exports.Users = class Users extends Service {

  create = async (data, params) => {
    data.username = data.username.toLowerCase()
    return super.create(data, params)
  }

};
