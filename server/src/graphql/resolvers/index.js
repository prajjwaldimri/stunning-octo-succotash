import user from './user';
import post from './post';

const resolvers = {
  Query: {
    ping: () => 'Pong',
    login: user.login,
    profile: user.profile,
    getPost: post.getPost,
    getFollowersOfUser: user.getFollowersOfUser,
    getFollowingOfUser: user.getFollowingOfUser,
    getCountOfFollowers: user.getCountOfFollowers,
    getCountOfFollowing: user.getCountOfFollowing,
  },
  Mutation: {
    createAccount: user.createAccount,
    followUser: user.followUser,
    unfollowUser: user.unfollowUser,
    createPost: post.createPost,
    createComment: post.createComment,
  },
  Post: {
    author: post.author,
  },
};

export { resolvers as default };
