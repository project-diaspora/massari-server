const assert = require('assert');
const utils = require('../test-utils');
const app = require('../../src/app');

describe('\'users\' service', async () => {
  let params = {};
  params.provider = 'rest';
  params.headers = {};

  it('registered the \'users\' service', () => {
    const service = app.service('users');

    assert.ok(service, 'Registered the service');
  });

  it('tries to create a user without proper headers', async () => {
    try {
      await app.service('users').create({
        username: 'michaeljordan',
        walletAddress: '0x123'
      }, params);
      assert.fail();
    } catch(err) {
      assert(err);
    }
  });

  it('tries to get a user without proper headers', async () => {
    try {
      await app.service('users').get('michaeljordan', params);
      assert.fail();
    } catch (err) {
      assert(err);
    }
  });

  it('creates a mnemonic', () => {
    const mnemonic = utils.generateMnemonic();
    assert.ok(utils.validateMnemonic(mnemonic));
  });

  it('gets a wallet address', () => {
    const mnemonic = utils.generateMnemonic();
    const walletAddress = utils.getWalletAddress(mnemonic);
    assert.ok(!!walletAddress);
  });

  describe('creating a user', async () => {
    let mnemonic,
      username,
      walletAddress,
      xTimestamp,
      xPath,
      xSignature;

    before(() => {
      mnemonic = utils.generateMnemonic();
      walletAddress = utils.getWalletAddress(mnemonic);
    });

    beforeEach(async () => {
      xTimestamp = Date.now();
    });

    it('creates a user', async () => {
      xPath = 'users';
      xSignature = await utils.signMessage(`${xPath}|${xTimestamp}`, mnemonic);

      params.headers['x-massari-signature'] = xSignature;
      params.headers['x-massari-timestamp'] = xTimestamp;
      username = `user_${Date.now()}`;

      const user = await app.service('users').create({
        username,
        walletAddress: walletAddress
      }, params);

      assert.ok(user.walletAddress, walletAddress);
    });

    it('gets a pre-created user', async () => {
      xPath = 'users/user_a';
      xSignature = await utils.signMessage(`${xPath}|${xTimestamp}`, mnemonic);

      params.headers['x-massari-signature'] = xSignature;
      params.headers['x-massari-timestamp'] = xTimestamp;

      const userA = await app.service('users').get('user_a', params);

      assert.ok(userA.username, 'user_a');

    });

    it('creates a transaction', async () => {
      xPath = 'transactions';
      xSignature = await utils.signMessage(`${xPath}|${xTimestamp}`, mnemonic);

      params.headers['x-massari-signature'] = xSignature;
      params.headers['x-massari-timestamp'] = xTimestamp;

      const transaction = await app.service('transactions').create({
        fromAddress: walletAddress,
        fromUsername: username,
        toAddress: '0x126',
        amountInBasicUnit: '2.235012315678987623',
        currency: 'DAI',
        transactionHash: '0xhash1236',
        note: 'a message'
      }, params);

      assert.equal(transaction.fromAddress, walletAddress);
      assert.equal(transaction.fromUsername, username);

    });

    it('creates a transaction for another user', async () => {
      xPath = 'transactions';
      xSignature = await utils.signMessage(`${xPath}|${xTimestamp}`, mnemonic);

      params.headers['x-massari-signature'] = xSignature;
      params.headers['x-massari-timestamp'] = xTimestamp;

      try {
        await app.service('transactions').create({
          fromAddress: walletAddress,
          fromUsername: 'user_a',
          toAddress: '0x126',
          amountInBasicUnit: '2.235012315678987623',
          currency: 'DAI',
          transactionHash: '0xhash1238',
          note: 'a message'
        }, params);        
      } catch (err) {
        assert(err);
      }
    });

    it('gets all transactions for user', async () => {
      xPath = 'transactions';
      xSignature = await utils.signMessage(`${xPath}|${xTimestamp}`, mnemonic);

      params.headers['x-massari-signature'] = xSignature;
      params.headers['x-massari-timestamp'] = xTimestamp;

      const transactions = await app.service('transactions').find(params);

      assert.ok(transactions.total === 1);
      assert.equal(transactions.data[0].transactionHash, '0xhash1236');
    });
  });

});
