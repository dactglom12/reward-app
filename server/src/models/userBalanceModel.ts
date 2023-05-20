import mongoose from "mongoose";
import { WithDBId, WithTimestamps, WithUserRelation } from "@typings/common";

type UserBalance = {
  balance: number;
} & WithTimestamps &
  WithDBId &
  WithUserRelation;

const userBalanceSchema = new mongoose.Schema<UserBalance>(
  {
    balance: {
      type: Number,
      default: 0,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserBalanceModel = mongoose.model<UserBalance>(
  "UserBalance",
  userBalanceSchema
);

export { UserBalanceModel, UserBalance };
