import { TaskTypes } from "@models/taskModel";

export const streakTypeTasks = [
  TaskTypes.SUGAR_LIMITATION,
  TaskTypes.WATER_CONSUMPTION,
];

export const requiredCompletionsTypeTasks = [TaskTypes.GYM_VISITS];

export const baseRewards = {
  [TaskTypes.GYM_VISITS]: 350,
  [TaskTypes.WATER_CONSUMPTION]: 5,
  [TaskTypes.SUGAR_LIMITATION]: 15,
};

export const requiredCompletionsPerMonth: {
  [key: string]: number;
} = {
  [TaskTypes.GYM_VISITS]: 10,
};
