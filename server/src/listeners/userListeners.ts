import { TaskTypes } from "@models/taskModel";
import { TaskStreakModel } from "@models/taskStreakModel";
import { UserAwardModel } from "@models/userAwardModel";
import { UserBalanceModel } from "@models/userBalanceModel";
import { UserModel, User } from "@models/userModel";

const onUserInit = (instance: User) => {
  const userBalance = new UserBalanceModel({ userId: instance._id });
  const userAwards = new UserAwardModel({ userId: instance._id });
  const taskStreaks = Object.values(TaskTypes).map(
    (type) => new TaskStreakModel({ userId: instance._id, type })
  );

  taskStreaks.forEach((streak) => {
    streak.save();
  });
  userBalance.save();
  userAwards.save();
};

UserModel.on("save", onUserInit);
