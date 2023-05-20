import { WithDBId, WithTimestamps } from "@typings/common";
import mongoose from "mongoose";

enum Rarities {
  COMMON = "common",
  RARE = "rare",
  EPIC = "epic",
  LEGENDARY = "legendary",
}

type Award = {
  image: string;
  title: string;
  description: string;
  price: number;
  rarity: Rarities;
} & WithDBId &
  WithTimestamps;

const awardSchema = new mongoose.Schema<Award>(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rarity: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AwardModel = mongoose.model<Award>("Award", awardSchema);

export { AwardModel, Award, Rarities };
