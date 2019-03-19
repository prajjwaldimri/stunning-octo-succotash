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
  email: String,
});

module.exports = mongoose.model('User', userSchema);
