import { WithDBId, WithTimestamps } from "@typings/common";
import mongoose from "mongoose";

type Word = {
  translation: string;
  audio: string;
  image: string;
  native: string;
  group: string;
} & WithDBId &
  WithTimestamps;

const wordSchema = new mongoose.Schema<Word>(
  {
    translation: {
      type: String,
      required: true,
    },
    audio: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    native: {
      type: String,
      required: true,
      unique: true,
    },
    group: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const WordModel = mongoose.model<Word>("Word", wordSchema);

export { WordModel, Word };
