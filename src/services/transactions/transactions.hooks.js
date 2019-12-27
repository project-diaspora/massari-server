const verifySignature = require('../../hooks/verify-signature');
const getUsernameFromAddress = require('../../hooks/get-username-from-address');
const restrictToUser = require('../../hooks/restrict-to-user');
const { disallow, iff, isProvider } = require('feathers-hooks-common');
const { setField } = require('feathers-authentication-hooks');

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
        restrictToUser()
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
