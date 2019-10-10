import { createAccount, followUser, unfollowUser, createPost } from './mutation';
import {
  login, profile, getFollowersOfUser, getFollowingOfUser, getCountOfFollowers, getCountOfFollowing,
} from './query';

module.exports = {
  createAccount,
  followUser,
  unfollowUser,
  createPost,
  login,
  profile,
  getFollowersOfUser,
  getFollowingOfUser,
  getCountOfFollowers,
  getCountOfFollowing,
};
