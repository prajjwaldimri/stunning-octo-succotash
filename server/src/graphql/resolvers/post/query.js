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

module.exports = {
  getPost,
};
