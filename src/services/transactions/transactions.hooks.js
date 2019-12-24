const verifySignature = require('../../hooks/verify-signature');
const { disallow, iff, isProvider } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [],
    find: [
      iff(isProvider('external'), [
        verifySignature(),
        context => {
          // store signature
          context.app.service('signatures').create(context.params.headers['x-massari-signature'])
        }
      ])
    ],
    get: [disallow('external')],
    create: [
      iff(isProvider('external'), [
        verifySignature(),
        context => {
          // store signature
          context.app.service('signatures').create(context.params.headers['x-massari-signature'])
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
