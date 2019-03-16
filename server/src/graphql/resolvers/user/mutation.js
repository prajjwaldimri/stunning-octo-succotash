import validator from 'validator';
import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import User from '../../../models/user';

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

module.exports = { createAccount };
