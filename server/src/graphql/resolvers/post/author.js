import User from '../../../models/user';

const author = async (parent, args) => {
  console.log('parent.author ', parent.author);
  return User.findById(parent.author);
};
module.exports = { author };
