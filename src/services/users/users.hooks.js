const verifySignature = require('../../hooks/verify-signature');
const getUsernameFromAddress = require('../../hooks/get-username-from-address');
const verifyAddressInRequestData = require('../../hooks/verify-address-in-request-data');
const { discard, disallow, iff, isProvider } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [],
    find: [disallow('external')],
    get: [iff(isProvider('external'), [
      verifySignature(),
      getUsernameFromAddress()
    ])],
    create: [
      verifySignature(),
      verifyAddressInRequestData()
    ],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()]
  },

  after: {
    all: [discard('_id')],
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
