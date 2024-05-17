import { WithDBId, WithTimestamps } from "./shared";

export type Word = {
  translation: string;
  audio: string;
  image: string;
  native: string;
} & WithTimestamps &
  WithDBId;

export type WordGroup = {
  title: string;
} & WithDBId &
  WithTimestamps;

export type WordTrainingSession = {
  wordsCount: number;
  group: WordGroup;
  correctAnswersCount: number;
} & WithDBId &
  WithTimestamps;
