import validator from 'validator';
import { UserInputError } from 'apollo-server-express';

const createAccount = (parent, args) => {
  if (!validator.isAlphanumeric(args.user.username)) {
    throw new UserInputError('username can only be alphanumeric');
  }
  if (validator.isEmpty(args.user.username)) {
    throw new Error('Username cannot be empty');
  }
  if (validator.isEmpty(args.user.password)) {
    throw new Error('password cannot be empty');
  }
  // Currently returning dummy data here.
  return { username: args.user.username };
};

module.exports = { createAccount };
