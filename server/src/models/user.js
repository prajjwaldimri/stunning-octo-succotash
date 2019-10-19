import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: { type: String, required: true },
    name: String,
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
