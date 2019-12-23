const verifySignature = require('../../hooks/verify-signature');
const checkAddress = require('../../hooks/check-address');
const { discard, disallow, iff, isProvider, keep } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [],
    find: [disallow('external')],
    get: [iff(isProvider('external'), [
      verifySignature(),
      checkAddress()
    ])],
    create: [verifySignature()],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()]
  },

  after: {
    all: [],
    find: [],
    get: [discard('_id')],
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
