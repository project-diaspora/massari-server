const assert = require('assert');
const app = require('../../src/app');

describe('\'signatures\' service', () => {
  it('registered the service', () => {
    const service = app.service('signatures');

    assert.ok(service, 'Registered the service');
  });
});
