const app = require('../../src/app');

describe('\'verify-signature\' hook', () => {
  it('registered the hook', () => {
    const hook = app.hooks('verify-signature');
    expect(hook).toBeTruthy();
  });
});
