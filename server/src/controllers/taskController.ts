import {
  baseRewards,
  requiredCompletionsPerMonth,
  requiredCompletionsTypeTasks,
} from "@constants/task";
import { TaskTypes } from "@models/taskModel";
import { BalanceService } from "@services/balanceService";
import { TaskService } from "@services/taskService";
import { TaskStreakService } from "@services/taskStreakService";
import { calculateFinalStreakReward } from "@utils/taskUtils";
import { Request, Response } from "express";

class TaskController {
  static async isTaskCompletedToday(req: Request, res: Response) {
    // TODO: bring better typing here
    const userId = (req as unknown as { user: { userId: string } }).user.userId;
    const { taskType } = req.query;
    const isTaskCompletedToday = await TaskService.isTaskCompletedToday({
      userId,
      taskType: taskType as TaskTypes,
    });

    return res.status(200).json({ isCompleted: isTaskCompletedToday });
  }

  static async complete(req: Request, res: Response) {
    try {
      // TODO: bring better typing here
      const userId = (req as unknown as { user: { userId: string } }).user
        .userId;
      const { taskType } = req.body;

      const typedTaskType = taskType as TaskTypes;

      const completedTask = await TaskService.complete({ taskType, userId });
      let specificCompletionResult: {
        ok?: boolean;
        error?: string;
        reward?: number;
      };

      if (requiredCompletionsTypeTasks.includes(typedTaskType)) {
        specificCompletionResult =
          await TaskController.completeRequiredCompletionTypeTask(
            userId,
            typedTaskType
          );
      } else {
        specificCompletionResult = await TaskController.completeStreakTypeTask(
          userId,
          typedTaskType
        );
      }

      if (!specificCompletionResult.ok) {
        return res.status(400).json({ error: specificCompletionResult.error });
      }

      await BalanceService.updateUserBalance({
        userId,
        updateSum: specificCompletionResult.reward ?? 0,
      });

      return res.status(200).json({
        task: completedTask,
        reward: specificCompletionResult.reward ?? 0,
      });
    } catch (err) {
      console.log((err as any).message);
      return res.status(400).json({ error: err });
    }
  }

  private static async completeStreakTypeTask(
    userId: string,
    taskType: TaskTypes
  ) {
    const extendedStreak = await TaskStreakService.extendStreak({
      userId,
      type: taskType,
    });

    if (!extendedStreak) {
      return { error: "Failed to update streak" };
    }

    const baseReward = baseRewards[taskType];

    const finalReward = calculateFinalStreakReward(
      baseReward,
      extendedStreak.streak
    );

    return { ok: true, reward: finalReward };
  }

  private static async completeRequiredCompletionTypeTask(
    userId: string,
    taskType: TaskTypes
  ) {
    const completionsThisMonth = await TaskService.getTaskCompletionsThisMonth({
      userId,
      taskType,
    });

    const updatedCompletions = completionsThisMonth + 1;
    const requiredCompletions = requiredCompletionsPerMonth[taskType];

    if (updatedCompletions === requiredCompletions) {
      const reward = baseRewards[taskType];

      return { ok: true, reward };
    }

    return { ok: true, reward: 0 };
  }
}

export { TaskController };
