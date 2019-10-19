import User from '../../../models/user';

const author = async (parent, args) => User.findById(parent.author);
module.exports = { author };
