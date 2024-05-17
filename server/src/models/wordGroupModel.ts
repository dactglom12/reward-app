import { WithDBId, WithTimestamps } from "@typings/common";
import mongoose from "mongoose";

type WordGroup = {
  title: string;
} & WithDBId &
  WithTimestamps;

const wordGroupSchema = new mongoose.Schema<WordGroup>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const WordGroupModel = mongoose.model<WordGroup>("WordGroup", wordGroupSchema);

export { WordGroup, WordGroupModel, wordGroupSchema };
