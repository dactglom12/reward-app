import { TaskTypes } from "@models/taskModel";
import { TaskStreakModel } from "@models/taskStreakModel";

interface ExtendStreakParams {
  userId: string;
  type: TaskTypes;
}

interface CreateStreakParams extends ExtendStreakParams {}

interface GetStreakParams extends ExtendStreakParams {}

interface ResetStreakParams extends ExtendStreakParams {}

class TaskStreakService {
  static async createStreak({ userId, type }: CreateStreakParams) {
    try {
      const streak = new TaskStreakModel({ type, userId });
      const savedStreak = await streak.save();

      return savedStreak;
    } catch (err) {
      throw new Error(`Failed to create streak: ${err}`);
    }
  }

  static async getStreak({ userId, type }: GetStreakParams) {
    try {
      const streak = await TaskStreakModel.findOne({ userId, type });

      if (!streak) return null;

      return streak;
    } catch (err) {
      throw new Error(`Failed to get streak: ${err}`);
    }
  }

  static async extendStreak({ userId, type }: ExtendStreakParams) {
    try {
      const currentStreak = await TaskStreakService.getStreak({ userId, type });

      if (!currentStreak) return false;

      const increasedStreak = currentStreak.streak + 1;

      const updatedStreak = await TaskStreakModel.findOneAndUpdate(
        { userId, type },
        { $set: { streak: increasedStreak } },
        { new: true }
      );

      return updatedStreak;
    } catch (err) {
      throw new Error(`Failed to extend streak: ${err}`);
    }
  }

  static async resetStreak({ userId, type }: ResetStreakParams) {
    try {
      const currentStreak = await TaskStreakService.getStreak({ userId, type });

      if (!currentStreak) return false;

      const updatedStreak = await TaskStreakModel.findOneAndUpdate(
        { userId, type },
        { $set: { streak: 0 } },
        { new: true }
      );

      return updatedStreak;
    } catch (err) {
      throw new Error(`Failed to reset streak: ${err}`);
    }
  }
}

export { TaskStreakService };
