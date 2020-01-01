const assert = require('assert');
const app = require('../src/app');
const mongooseClient = app.get('mongooseClient');

describe('Feathers application tests', () => {

  before(async () => {
    await mongooseClient.connection.dropDatabase();
  });

  it('populates two new users', async () => {
    const userA = await app.service('users').create({
      username: 'user_a'
    }, {
      walletAddress: '0x123'
    });

    const userB = await app.service('users').create({
      username: 'user_b'
    }, {
      walletAddress: '0x124'
    });

    assert.equal(userA.username, 'user_a');
    assert.equal(userB.username, 'user_b');
  });

  it('populates two transactions for user_a', async () => {
    const transactionA = await app.service('transactions').create({
      fromAddress: '0x123',
      fromUsername: 'user_a',
      toAddress: '0x124',
      toUsername: 'user_b',
      amountInBasicUnit: '1.235012315678987623',
      currency: 'DAI',
      transactionHash: '0xhash1234',
      note: 'a message'
    });

    const transactionB = await app.service('transactions').create({
      fromAddress: '0x123',
      fromUsername: 'user_a',
      toAddress: '0x125',
      amountInBasicUnit: '2.235012315678987623',
      currency: 'DAI',
      transactionHash: '0xhash1235',
      note: 'a message'
    });

    assert.equal(transactionA.fromUsername, 'user_a');
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
