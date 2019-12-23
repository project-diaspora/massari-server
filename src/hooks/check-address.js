// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {

    const walletAddress = context.params.walletAddress
    const res = await context.app.service('users').find({ query: { wallet_address: walletAddress } })

    if (!res.data[0]) {
      logger.error('no user found')
      throw new NotAuthenticated()
    }

    delete context.params.walletAddress
    context.params.user = res.data[0]
    console.log(context.params)
    return context
  };
};
