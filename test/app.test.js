const assert = require('assert');
const app = require('../src/app');
const mongooseClient = app.get('mongooseClient');

describe('Feathers application tests', () => {

  before(async () => {
    await mongooseClient.connection.dropDatabase();
  });

  it('populates two new users', async () => {
    const userA = await app.service('users').create({
      username: 'usera'
    }, {
      walletAddress: '0x123'
    });

    const userB = await app.service('users').create({
      username: 'userb'
    }, {
      walletAddress: '0x124'
    });

    assert.equal(userA.username, 'usera');
    assert.equal(userB.username, 'userb');
  });

  it('populates two transactions for usera', async () => {
    const transactionA = await app.service('transactions').create({
      fromAddress: '0x123',
      fromUsername: 'usera',
      toAddress: '0x124',
      toUsername: 'userb',
      amountInBasicUnit: '1.235012315678987623',
      currency: 'DAI',
      transactionHash: '0xhash1234',
      note: 'a message'
    });

    const transactionB = await app.service('transactions').create({
      fromAddress: '0x123',
      fromUsername: 'usera',
      toAddress: '0x125',
      amountInBasicUnit: '2.235012315678987623',
      currency: 'DAI',
      transactionHash: '0xhash1235',
      note: 'a message'
    });

    assert.equal(transactionA.fromUsername, 'usera');
    assert.equal(transactionB.transactionHash, '0xhash1235');
  });

  it('registered the \'transactions\' service', () => {
    const service = app.service('transactions');

    assert.ok(service, 'Registered the service');
  });

  it('registered the \'users\' service', () => {
    const service = app.service('users');

    assert.ok(service, 'Registered the service');
  });
});
