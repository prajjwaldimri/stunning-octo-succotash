import { createAccount, followUser, unfollowUser } from './mutation';
import {
  login, profile, getFollowersOfUser, getFollowingOfUser, getCountofFollowers, getCountofFollowing,
} from './query';

module.exports = {
  createAccount,
  followUser,
  unfollowUser,
  login,
  profile,
  getFollowersOfUser,
  getFollowingOfUser,
  getCountofFollowers,
  getCountofFollowing,
};
