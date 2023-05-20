import { UserBalanceModel } from "@models/userBalanceModel";
import { User } from "@models/userModel";

interface GetUserBalanceParams {
  userId: User["_id"];
}

interface UpdateUserBalanceParams extends GetUserBalanceParams {
  updateSum: number;
}

class BalanceService {
  static async getUserBalance({ userId }: GetUserBalanceParams) {
    try {
      const balance = await UserBalanceModel.findOne({ userId });

      return balance;
    } catch (err) {
      throw new Error(`Failed to get user balance: ${err}`);
    }
  }

  static async updateUserBalance({
    updateSum,
    userId,
  }: UpdateUserBalanceParams) {
    try {
      const userBalance = (await BalanceService.getUserBalance({ userId }))
        ?.balance;

      if (typeof userBalance !== "number") {
        throw new Error(`Failed to update user balance: no balance found`);
      }

      const newBalance = userBalance + updateSum;

      const updatedBalance = await UserBalanceModel.findOneAndUpdate(
        { userId },
        { $set: { balance: newBalance } },
        { new: true }
      );

      return updatedBalance;
    } catch (err) {
      throw new Error(`Failed to update user balance: ${err}`);
    }
  }
}

export { BalanceService };
