

import validator from 'validator';
import { UserInputError } from 'apollo-server-express';

const createAccount = (parent, args) => {
  if (!validator.isAlphanumeric(args.user.username)) {
    throw new UserInputError('username can only be alphanumeric');
  }
  if (validator.isEmpty(args.user.username)) {
    throw new Error('Username cannot be empty');
  }
};


module.exports = { createAccount };
