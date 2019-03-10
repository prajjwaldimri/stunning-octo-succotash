import user from './user';

const resolvers = {
  Query: {
    ping: () => 'Pong',
  },
  Mutation: {
    createAccount: user.createAccount,
  },
};

export { resolvers as default };
