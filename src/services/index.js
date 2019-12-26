const users = require('./users/users.service.js');
const transactions = require('./transactions/transactions.service.js');
const signatures = require('./signatures/signatures.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(transactions);
  app.configure(signatures);
};
