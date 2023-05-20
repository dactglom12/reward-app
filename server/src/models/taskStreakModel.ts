import mongoose from "mongoose";
import { WithDBId, WithTimestamps, WithUserRelation } from "@typings/common";
import { TaskTypes } from "./taskModel";

type TaskStreak = {
  type: TaskTypes;
  streak: number;
} & WithDBId &
  WithTimestamps &
  WithUserRelation;

const taskStreakSchema = new mongoose.Schema<TaskStreak>({
  streak: {
    type: Number,
    default: 0,
  },
  userId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const TaskStreakModel = mongoose.model<TaskStreak>(
  "TaskStreak",
  taskStreakSchema
);

export { TaskStreak, TaskStreakModel };
