import mongoose from "mongoose";
import { WithDBId, WithTimestamps, WithUserRelation } from "@typings/common";

enum TaskTypes {
  WATER_CONSUMPTION = "water_consumption",
  GYM_VISITS = "gym_visits",
  SUGAR_LIMITATION = "sugar_limitation",
}

type Task = {
  type: TaskTypes;
} & WithTimestamps &
  WithDBId &
  WithUserRelation;

const taskSchema = new mongoose.Schema<Task>(
  {
    userId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model<Task>("Task", taskSchema);

export { TaskTypes, TaskModel, Task };
