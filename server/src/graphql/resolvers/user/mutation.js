/* eslint-disable no-underscore-dangle */
import validator from 'validator';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import User from '../../../models/user';
import Post from '../../../models/post';
import UserFollowing from '../../../models/userFollowing';

const createAccount = async (parent, args) => {
  if (!validator.isAlphanumeric(args.user.username)) {
    throw new UserInputError('username can only be alphanumeric');
  }
  if (validator.isEmpty(args.user.username, { ignore_whitespace: true })) {
    throw new UserInputError('Username cannot be empty');
  }
  if (validator.isEmpty(args.user.password, { ignore_whitespace: true })) {
    throw new UserInputError('Password cannot be empty');
  }

  const user = await User.findOne({ username: args.user.username });
  if (user) {
    throw new UserInputError('Username already exist');
  }

  const hashedPassword = await bcrypt.hash(args.user.password, 10);
  return User.create({ username: args.user.username, password: hashedPassword });
};

const followUser = async (parent, args, { user }) => {
  if (!user) {
    throw new AuthenticationError('You are not logged in!');
  }
  if (validator.isEmpty(args.id, { ignore_whitespace: true })) {
    throw new UserInputError('User id cannot be empty');
  }

  const userFound = await User.findById(args.id)
    .lean()
    .exec();

  if (!userFound) {
    throw new UserInputError('user does not exist (wrong id provided)');
  }

  const currentUser = await User.findOne({ username: user.username })
    .lean()
    .exec();

  const isUserAlreadyFollowing = await UserFollowing.findOne({
    follower: currentUser._id,
    following: args.id,
  });

  if (isUserAlreadyFollowing) {
    throw new UserInputError('Already following the provided user');
  }

  await UserFollowing.create({ follower: currentUser._id, following: args.id });

  return User.findOneAndUpdate(
    { username: user.username },
    { $push: { following: args.id } },
    { new: true },
  );
};

const unfollowUser = async (parent, args, { user }) => {
  if (!user) {
    throw new AuthenticationError('You are not logged in!');
  }
  if (validator.isEmpty(args.id, { ignore_whitespace: true })) {
    throw new UserInputError('User id cannot be empty');
  }

  const userFound = await User.findById(args.id);
  if (!userFound) {
    throw new UserInputError('user does not exist (wrong id provided)');
  }

  const currentUser = await User.findOne({ username: user.username })
    .lean()
    .exec();

  const isUserAlreadyFollowing = await UserFollowing.findOne({
    follower: currentUser._id,
    following: args.id,
  });

  if (!isUserAlreadyFollowing) {
    throw new UserInputError('Not following provided user(first follow to unfollow)');
  }

  await UserFollowing.findOneAndDelete({
    follower: currentUser._id,
    following: args.id,
  });

  return User.findOneAndUpdate(
    { username: user.username },
    { $pull: { following: args.id } },
    { new: true },
  );
};

const createPost = async (parent, args, { user }) => {
  if (!user) {
    throw new AuthenticationError('You are not logged in!');
  }
  if (validator.isEmpty(args.post.title, { ignore_whitespace: true })) {
    throw new UserInputError('Post title cannot be empty');
  }
  if (validator.isEmpty(args.post.body, { ignore_whitespace: true })) {
    throw new UserInputError('Post body cannot be empty');
  }
  return Post.create({ title: args.post.title, body: args.post.body, author: user.username });
};

module.exports = {
  createAccount, followUser, unfollowUser, createPost,
};
