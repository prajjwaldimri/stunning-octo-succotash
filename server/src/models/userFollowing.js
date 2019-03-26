import mongoose, { Schema } from 'mongoose';

const userFollowingSchema = new Schema(
  {
    follower: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    following: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('UserFollowing', userFollowingSchema);
