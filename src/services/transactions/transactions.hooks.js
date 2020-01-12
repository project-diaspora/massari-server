const verifySignature = require('../../hooks/verify-signature');
const getUsernameFromAddress = require('../../hooks/get-username-from-address');
const { disallow, iff, isProvider } = require('feathers-hooks-common');
const logger = require('../../logger');

module.exports = {
  before: {
    all: [],
    find: [
      iff(isProvider('external'), [
        verifySignature(),
        getUsernameFromAddress(),
      ])
    ],
    get: [disallow('external')],
    create: [
      iff(isProvider('external'), [
        verifySignature(),
        getUsernameFromAddress(),
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
    create: [
      context => {
        logger.info(`${context.params.user.username} created a transaction`);
        return context;
      }
    ],
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
