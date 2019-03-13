import validator from 'validator';
import { UserInputError } from 'apollo-server-express';

const createAccount = (parent, args) => {
  if (!validator.isAlphanumeric(args.user.username)) {
    throw new UserInputError('username can only be alphanumeric');
  }
  if (validator.isEmpty(args.user.username, { ignore_whitespace: true })) {
    throw new UserInputError('Username cannot be empty');
  }
  if (validator.isEmpty(args.user.password, { ignore_whitespace: true })) {
    throw new UserInputError('Password cannot be empty');
  }
  // Currently returning dummy data here.
  return { username: args.user.username };
};
const login = (parent, args) => {
  if (validator.isEmpty(args.user.username, { ignore_whitespace: true })) {
    throw new UserInputError('Username cannot be empty');
  }
  if (validator.isEmpty(args.user.password, { ignore_whitespace: true })) {
    throw new UserInputError('password cannot be empty');
  }
  if (args.user.username === 'kaiskas' && args.user.password === 'password1234') {
    return { username: args.user.username };
  }
  throw new UserInputError('Username or password did not match');
};
module.exports = { createAccount, login };
