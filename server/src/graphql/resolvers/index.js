import user from './user';

const resolvers = {
  Query: {
    ping: () => 'Pong',
    login: user.login,
    profile: user.profile,
  },
  Mutation: {
    createAccount: user.createAccount,
  },
};

export { resolvers as default };
