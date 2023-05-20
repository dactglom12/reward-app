import { streakTypeTasks } from "@constants/task";
import { User } from "@models/userModel";
import { TaskService } from "@services/taskService";
import { TaskStreakService } from "@services/taskStreakService";
import { UserService } from "@services/userService";
import cron from "node-cron";

export const streakCheckJob = cron.schedule("0 2 * * *", async () => {
  const users = await UserService.getAllUsers();

  if (!users) return;

  await recursivelyCheckStreaks(users, 0);
});

const recursivelyCheckStreaks = async (
  users: User[],
  index = 0
): Promise<undefined> => {
  if (index >= users.length) return;

  await checkUserStreaks(users[index]);

  return recursivelyCheckStreaks(users, index + 1);
};

const checkUserStreaks = async (user: User) => {
  const taskCompletionCheckRequests = streakTypeTasks.map((type) =>
    TaskService.isTaskCompletedToday({ userId: user._id, taskType: type })
  );

  const results = await Promise.allSettled(taskCompletionCheckRequests);
  const resetStreakRequests: Promise<any>[] = [];

  results.forEach((res, index) => {
    if (res.status === "fulfilled") {
      if (!res.value) {
        resetStreakRequests.push(
          TaskStreakService.resetStreak({
            userId: user._id,
            type: streakTypeTasks[index],
          })
        );
      }
    }
  });

  if (resetStreakRequests.length > 0) {
    await Promise.all(resetStreakRequests);
  }
};
