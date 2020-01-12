const storeSignature = require('./hooks/store-signature');
const { iff, isProvider, discard } = require('feathers-hooks-common');
const logger = require('./logger');

module.exports = {
  before: {
    all: [
      iff(isProvider('external'), storeSignature())
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      discard('__v'), 
      discard('_id'),
      discard('createdAt'),
      discard('updatedAt'),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [
      error => logger.log('error', error)
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
