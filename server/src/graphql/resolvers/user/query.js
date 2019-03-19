import validator from 'validator';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
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

  const token = jwt.sign({ username: args.user.username }, process.env.JWT_SECRET_KEY);
  return token;
};

function generateMongooseSelectFieldsFromInfo(info) {
  return new Promise((resolve, reject) => {
    if (!info) {
      reject(new Error('Info is null'));
    }
    let returnFields = '';
    const selectionFields = info.operation.selectionSet.selections[0].selectionSet.selections;
    for (const field of selectionFields) {
      if (field.name.value !== '__typename') {
        returnFields += field.name.value;
        returnFields += ' ';
      }
    }
    resolve(returnFields);
  });
}

const profile = async (parent, args, { user }, info) => {
  if (!user) {
    throw new AuthenticationError('You are not logged in!');
  }
  const mongooseSelectionFields = await generateMongooseSelectFieldsFromInfo(info);

  return User.findOne({ username: user.username }, mongooseSelectionFields, { lean: true });
};

module.exports = { login, profile };
