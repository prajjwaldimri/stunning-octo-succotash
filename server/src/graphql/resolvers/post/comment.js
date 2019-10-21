import Comment from '../../../models/comment';

const comment = async (parent, args) => Comment.find({ post: parent.id });
module.exports = { comment };
