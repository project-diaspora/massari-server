const verifySignature = require('../../hooks/verify-signature');
const getUsernameFromAddress = require('../../hooks/get-username-from-address');
const verifyAddressInRequest = require('../../hooks/verify-address-in-request');
const { disallow, iff, isProvider } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [],
    find: [
      iff(isProvider('external'), [
        verifySignature()
      ])
    ],
    get: [
      iff(isProvider('external'), [
        verifySignature(),
        getUsernameFromAddress()
      ])
    ],
    create: [
      iff(isProvider('external'), [
        verifySignature(),
        verifyAddressInRequest()
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
