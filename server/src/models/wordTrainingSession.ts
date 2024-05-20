import { WithDBId, WithTimestamps } from "@typings/common";
import mongoose from "mongoose";
import { WordGroup, getWordGroupSchema } from "./wordGroupModel";

type WordTrainingSession = {
  wordsCount: number;
  group: WordGroup;
  correctAnswersCount: number;
  userId: string;
} & WithDBId &
  WithTimestamps;

const wordTrainingSessionSchema = new mongoose.Schema<WordTrainingSession>(
  {
    correctAnswersCount: Number,
    wordsCount: Number,
    group: getWordGroupSchema(false),
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const WordTrainingSessionModel = mongoose.model<WordTrainingSession>(
  "WordTrainingSession",
  wordTrainingSessionSchema
);

export { WordTrainingSessionModel, WordTrainingSession };
