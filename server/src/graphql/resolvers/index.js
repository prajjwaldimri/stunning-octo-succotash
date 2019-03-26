import user from './user';

const resolvers = {
  Query: {
    ping: () => 'Pong',
    login: user.login,
    profile: user.profile,
    getFollowersOfUser: user.getFollowersOfUser,
    getFollowingOfUser: user.getFollowingOfUser,
  },
  Mutation: {
    createAccount: user.createAccount,
    followUser: user.followUser,
    unfollowUser: user.unfollowUser,
  },
};

export { resolvers as default };
