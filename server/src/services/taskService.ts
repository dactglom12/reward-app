import { TaskModel, TaskTypes } from "@models/taskModel";
import { DateTime } from "luxon";

interface CompleteTaskParams {
  taskType: TaskTypes;
  userId: string;
}

interface GetTaskCompletionsThisMonthParams extends CompleteTaskParams {}

interface IsTaskCompletedTodayParams extends CompleteTaskParams {}

class TaskService {
  static async complete({ taskType, userId }: CompleteTaskParams) {
    try {
      const task = new TaskModel({ type: taskType, userId });
      const savedTask = await task.save();

      return savedTask;
    } catch (err) {
      throw new Error(`Failed to complete task: ${err}`);
    }
  }

  static async isTaskCompletedToday({
    userId,
    taskType,
  }: IsTaskCompletedTodayParams) {
    try {
      const currentDate = DateTime.utc();
      const startOfToday = currentDate.startOf("day");
      const endOfToday = currentDate.endOf("day");

      const task = await TaskModel.findOne({
        userId,
        type: taskType,
        createdAt: {
          $gte: startOfToday,
          $lte: endOfToday,
        },
      });

      if (!task) return false;

      return true;
    } catch (err) {
      throw new Error(
        `Failed to compute whether task has been completed today`
      );
    }
  }

  static async getTaskCompletionsThisMonth({
    taskType,
    userId,
  }: GetTaskCompletionsThisMonthParams) {
    try {
      const currentDate = DateTime.utc();
      const startOfMonth = currentDate.startOf("month").toJSDate();
      const endOfMonth = currentDate.endOf("month").toJSDate();

      const taskDocs = await TaskModel.find({
        type: taskType,
        userId,
        createdAt: {
          $gte: startOfMonth,
          $lte: endOfMonth,
        },
      });

      if (!taskDocs) return 0;

      return taskDocs.length;
    } catch (err) {
      throw new Error(`Failed to get task completions this month: ${err}`);
    }
  }
}

export { TaskService };
