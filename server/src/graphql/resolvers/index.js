import user from './user';

const resolvers = {
  Query: {
    ping: () => 'Pong',
  },
  Mutation: {
    createAccount: user.createAccount,
    login: user.login,
  },
};

export { resolvers as default };
