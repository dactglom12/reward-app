import { WithDBId, WithTimestamps } from "@typings/common";
import mongoose from "mongoose";
import { WordGroup, getWordGroupSchema } from "./wordGroupModel";

type WordTrainingSession = {
  wordsCount: number;
  group: WordGroup;
  correctAnswersCount: number;
} & WithDBId &
  WithTimestamps;

const wordTrainingSessionSchema = new mongoose.Schema<WordTrainingSession>(
  {
    correctAnswersCount: Number,
    wordsCount: Number,
    group: getWordGroupSchema(false),
  },
  { timestamps: true }
);

const WordTrainingSessionModel = mongoose.model<WordTrainingSession>(
  "WordTrainingSession",
  wordTrainingSessionSchema
);

export { WordTrainingSessionModel, WordTrainingSession };
