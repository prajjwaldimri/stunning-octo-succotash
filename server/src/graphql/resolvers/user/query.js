import validator from 'validator';
import { UserInputError, AuthenticationError, ApolloError } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../../models/user';
import UserFollowing from '../../../models/userFollowing';

const login = async (parent, args) => {
  if (validator.isEmpty(args.user.username, { ignore_whitespace: true })) {
    throw new UserInputError('Username cannot be empty');
  }
  if (validator.isEmpty(args.user.password, { ignore_whitespace: true })) {
    throw new UserInputError('password cannot be empty');
  }

  const user = await User.findOne({ username: args.user.username });
  // If no user with the given username is found, then show this error
  if (!user) {
    throw new UserInputError('Username or password is/are wrong');
  }

  const isPasswordMatching = await bcrypt.compare(args.user.password, user.password);
  if (!isPasswordMatching) {
    throw new UserInputError('Username or password is/are wrong');
  }

  const token = jwt.sign({ username: args.user.username }, process.env.JWT_SECRET_KEY);
  return token;
};

/**
 * Creates a mongoose select string from the given graphql query
 *
 * @param  {Object} info - GraphQL resolver's info parameter
 * @return {string} Returns a string which can be used as a select parameter in any mongoose query https://mongoosejs.com/docs/api.html#query_Query-select
 */
function generateMongooseSelectFieldsFromInfo(info) {
  return new Promise((resolve, reject) => {
    if (!info) {
      reject(new Error('Info is null'));
    }
    let returnFields = '';
    const selectionFields = info.operation.selectionSet.selections[0].selectionSet.selections;

    selectionFields.forEach((field) => {
      if (field.name.value !== '__typename') {
        returnFields += field.name.value;
        returnFields += ' ';
      }
    });
    resolve(returnFields);
  });
}

const profile = async (parent, args, { user }, info) => {
  if (!user) {
    throw new AuthenticationError('You are not logged in!');
  }
  try {
    const mongooseSelectionFields = await generateMongooseSelectFieldsFromInfo(info);
    return User.findOne({ username: user.username }, mongooseSelectionFields, { lean: true });
  } catch (error) {
    throw new ApolloError(error);
  }
};

const getFollowersOfUser = async (parent, args, { user }) => {
  if (!user) {
    throw new AuthenticationError('You are not logged in!');
  }

  const currentUser = await User.findOne({ username: user.username });

  let followers = await UserFollowing.find({ following: currentUser._id }, 'follower')
    .populate('follower', 'username')
    .lean()
    .exec();

  followers = followers.map(data => data.follower);
  return followers;
};

const getFollowingOfUser = async (parent, args, { user }) => {
  if (!user) {
    throw new AuthenticationError('You are not logged in!');
  }
  const currentUser = await User.findOne({ username: user.username })
    .populate('following')
    .select('following')
    .lean()
    .exec();
  return currentUser.following;
};

const getCountOfFollowers = async (parent, args) => {

};
const getCountOfFollowing = async (parent, args) => {

};
module.exports = {
  login,
  profile,
  getFollowersOfUser,
  getFollowingOfUser,
  getCountOfFollowers,
  getCountOfFollowing,
};
