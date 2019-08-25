import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    picture: String
  },
  { timestamps: true }
);

export const User = mongoose.model('User', UserSchema);
