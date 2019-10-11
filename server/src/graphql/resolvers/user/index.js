import {
  createAccount, followUser, unfollowUser, createPost, createComment,
} from './mutation';
import {
  login, profile, getFollowersOfUser, getFollowingOfUser, getCountOfFollowers, getCountOfFollowing,
} from './query';

module.exports = {
  createAccount,
  followUser,
  unfollowUser,
  createPost,
  createComment,
  login,
  profile,
  getFollowersOfUser,
  getFollowingOfUser,
  getCountOfFollowers,
  getCountOfFollowing,
};
