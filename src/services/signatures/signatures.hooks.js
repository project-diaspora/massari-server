const { disallow } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [],
    find: [disallow()],
    get: [disallow('external')],
    create: [disallow('external')],
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
