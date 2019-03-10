

import validator from 'validator';
import { UserInputError } from 'apollo-server-express';

const createAccount = (parent, args) => {
  if (!validator.isAlphanumeric(args.user.username)) {
    throw new UserInputError('username can only be alphanumeric');
  }
  throw new Error('Method not implemented!');
};


module.exports = { createAccount };
