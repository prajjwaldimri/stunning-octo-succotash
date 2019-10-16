import user from './user';

const resolvers = {
  Query: {
    ping: () => 'Pong',
    login: user.login,
    profile: user.profile,
    getPost: user.getPost,
    getFollowersOfUser: user.getFollowersOfUser,
    getFollowingOfUser: user.getFollowingOfUser,
    getCountOfFollowers: user.getCountOfFollowers,
    getCountOfFollowing: user.getCountOfFollowing,
  },
  Mutation: {
    createAccount: user.createAccount,
    followUser: user.followUser,
    unfollowUser: user.unfollowUser,
    createPost: user.createPost,
    createComment: user.createComment,
  },
};

export { resolvers as default };
