import mongoose from 'mongoose';

export interface UserModel extends mongoose.Document {
  email: string;
  password: string;
  username: string;
}

const UserSchema: mongoose.Schema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<UserModel>('User', UserSchema);
