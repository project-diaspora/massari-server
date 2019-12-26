const verifySignature = require('../../hooks/verify-signature');
const getUsernameFromAddress = require('../../hooks/get-username-from-address');
const { disallow, iff, isProvider } = require('feathers-hooks-common');
const { setField } = require('feathers-authentication-hooks');
const { BadRequest } = require('@feathersjs/errors');
const logger = require('../../logger');

module.exports = {
  before: {
    all: [],
    find: [
      iff(isProvider('external'), [
        verifySignature(),
        getUsernameFromAddress(),
        setField({
          from: 'params.user.username',
          as: 'params.query.fromUsername'
        })
      ])
    ],
    get: [disallow('external')],
    create: [
      iff(isProvider('external'), [
        verifySignature(),
        getUsernameFromAddress(),
        context => {
          if (context.params.user.username !== context.data.fromUsername) {
            logger.error('creating a transaction for another user');
            throw new BadRequest();
          }
        }
      ])
    ],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
