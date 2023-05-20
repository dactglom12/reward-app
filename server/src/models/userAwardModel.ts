import { WithDBId, WithTimestamps, WithUserRelation } from "@typings/common";
import mongoose from "mongoose";

type UserAward = {
  awardIds: string[];
} & WithDBId &
  WithTimestamps &
  WithUserRelation;

const userAwardSchema = new mongoose.Schema<UserAward>(
  {
    awardIds: {
      type: [String],
      required: true,
      default: [],
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const UserAwardModel = mongoose.model<UserAward>("UserAward", userAwardSchema);

export { UserAward, UserAwardModel };
