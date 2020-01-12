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
        context => {
          logger.info(`${context.result.username} logging in with recovery phrase`);
          return context;
        }
      ])
    ],
    get: [
      iff(isProvider('external'), [
        verifySignature(),
        getUsernameFromAddress(),
        context => {
          logger.info(`${context.params.user.username} searched for ${context.id}`);
          return context;
        }
      ])
    ],
    create: [
      iff(isProvider('external'), [
        verifySignature()
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
        logger.info(`${context.result.username} created an account`);
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
