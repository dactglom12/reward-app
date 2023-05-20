import mongoose from "mongoose";
import { WithDBId, WithTimestamps } from "@typings/common";

type User = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
} & WithTimestamps &
  WithDBId;

const userSchema = new mongoose.Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<User>("User", userSchema);

export { UserModel, User };
