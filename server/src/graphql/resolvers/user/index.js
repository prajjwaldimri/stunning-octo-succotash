import {
  createAccount, followUser, unfollowUser, createPost, createComment,
} from './mutation';
import {
  login, profile, getFollowersOfUser, getFollowingOfUser, getCountOfFollowers, getCountOfFollowing, getPost,
} from './query';

module.exports = {
  createAccount,
  followUser,
  unfollowUser,
  createPost,
  createComment,
  login,
  profile,
  getPost,
  getFollowersOfUser,
  getFollowingOfUser,
  getCountOfFollowers,
  getCountOfFollowing,
};
