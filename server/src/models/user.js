import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
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
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    unique: true,
    sparse: true,
  },
});

module.exports = mongoose.model('User', userSchema);
