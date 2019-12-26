const assert = require('assert');
const app = require('../../src/app');


describe('\'signatures\' service', async () => {

  it('registered the \'signatures\' service', () => {
    const service = app.service('signatures');

    assert.ok(service, 'Registered the service');
  });
});
