import validator from 'validator';
import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../../models/user';

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

  const token = jwt.sign({ user: args.user.username }, process.env.JWT_SECRET_KEY);
  return token;
};

module.exports = { login };
