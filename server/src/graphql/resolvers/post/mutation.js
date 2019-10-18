/* eslint-disable no-underscore-dangle */
import validator from 'validator';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import User from '../../../models/user';
import Post from '../../../models/post';
import Comment from '../../../models/comment';

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

const createComment = async (parent, args, { user }) => {
  if (!user) {
    throw new AuthenticationError('user is not valid');
  }
  if (validator.isEmpty(args.body, { ignore_whitespace: true })) {
    throw new UserInputError('Comment body cannot be empty');
  }

  const currentUser = await User.findOne({ username: user.username })
    .lean()
    .exec();

  const comment = await Comment.create(
    {
      body: args.body,
      author: currentUser._id,
      post: args.postId,
    },
  );

  await Post.findByIdAndUpdate(
    args.postId,
    { $push: { comments: comment._id } },
    { new: true, useFindAndModify: true },
  );

  return comment;
};

module.exports = {
  createPost,
  createComment,
};
