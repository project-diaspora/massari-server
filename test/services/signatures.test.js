const app = require('../../src/app');

describe('\'signatures\' service', () => {
  it('registered the service', () => {
    const service = app.service('signatures');
    expect(service).toBeTruthy();
  });
});
