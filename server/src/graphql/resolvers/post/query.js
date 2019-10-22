import validator from 'validator';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import User from '../../../models/user';
import Post from '../../../models/post';

const getPost = async (parent, args, { user }) => {
  if (!user) {
    throw new AuthenticationError('You are not logged in!');
  }

  if (!args.title) {
    return Post.find({});
  }

  return Post.find({ title: args.title });
};

const getKudosOfPost = async (parent, args, { user }) => {
  if (!user) {
    throw new AuthenticationError('You are not logged in!');
  }

  let getKudos = await Post.find({ id: args.id }, 'kudos')
    .populate('kudos', 'username')
    .lean()
    .exec();

  getKudos = getKudos.map(data => data.kudos);
  return getKudos;
};

const getBoooOfPost = async (parent, args, { user }) => {
  if (!user) {
    throw new AuthenticationError('You are not logged in!');
  }

  let getBooo = await Post.find({ id: args.id }, 'booo')
    .populate('booo', 'username')
    .lean()
    .exec();

  getBooo = getBooo.map(data => data.booo);
  return getBooo;
};

module.exports = {
  getPost,
  getKudosOfPost,
  getBoooOfPost,
};
