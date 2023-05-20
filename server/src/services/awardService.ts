import { Award, AwardModel } from "@models/awardModel";

class AwardService {
  static async createAward(
    awardData: Pick<
      Award,
      "image" | "description" | "price" | "rarity" | "title"
    >
  ) {
    try {
      const award = new AwardModel(awardData);
      const savedAward = await award.save();

      return savedAward;
    } catch (err) {
      throw new Error(`Failed to create award: ${err}`);
    }
  }

  static async getAllAwards() {
    try {
      const awards = await AwardModel.find();

      return awards;
    } catch (err) {
      throw new Error(`Failed to get all awards: ${err}`);
    }
  }
}

export { AwardService };
