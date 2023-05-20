import { UserAwardModel } from "@models/userAwardModel";

interface GetUserAwardsParams {
  userId: string;
}

interface GrantAwardParams extends GetUserAwardsParams {
  awardId: string;
}

class UserAwardService {
  static async getUserAwardIds({ userId }: GetUserAwardsParams) {
    try {
      const awards = await UserAwardModel.findOne({ userId });

      return awards;
    } catch (err) {
      throw new Error("Failed to get user awards");
    }
  }

  static async grantAward({ userId, awardId }: GrantAwardParams) {
    try {
      const awardIds = (await UserAwardService.getUserAwardIds({ userId }))
        ?.awardIds;

      awardIds?.push(awardId);

      const updatedUserAwards = await UserAwardModel.updateOne(
        { userId },
        { $set: { awardIds } },
        { new: true }
      );

      return updatedUserAwards;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to grant award to user");
    }
  }
}

export { UserAwardService };
