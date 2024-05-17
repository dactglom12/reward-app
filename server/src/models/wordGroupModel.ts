import { WithDBId, WithTimestamps } from "@typings/common";
import mongoose from "mongoose";

type WordGroup = {
  title: string;
} & WithDBId &
  WithTimestamps;

const getWordGroupSchema = (isTitleUnique: boolean) =>
  new mongoose.Schema<WordGroup>(
    {
      title: {
        type: String,
        required: true,
        unique: isTitleUnique,
      },
    },
    { timestamps: true }
  );

const WordGroupModel = mongoose.model<WordGroup>(
  "WordGroup",
  getWordGroupSchema(true)
);

export { WordGroup, WordGroupModel, getWordGroupSchema };
