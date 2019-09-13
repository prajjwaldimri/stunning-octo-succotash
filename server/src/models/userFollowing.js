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

userFollowingSchema.index({ follower: 1, following: 1 }, { unique: true });

module.exports = mongoose.model('UserFollowing', userFollowingSchema);
