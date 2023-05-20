import { BalanceService } from "@services/balanceService";
import { UserAwardService } from "@services/userAwardService";
import { Request, Response } from "express";

class UserAwardController {
  static async getUserAwards(req: Request, res: Response) {
    // TODO: bring better typing here
    const userId = (req as unknown as { user: { userId: string } }).user.userId;

    try {
      const awards = await UserAwardService.getUserAwardIds({ userId });

      return res.status(200).json({ awards });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  static async grantAward(req: Request, res: Response) {
    // TODO: bring better typing here
    const userId = (req as unknown as { user: { userId: string } }).user.userId;
    const { awardId, price } = req.body;

    try {
      await BalanceService.updateUserBalance({
        userId,
        updateSum: -Number(price),
      });
      const updatedAwards = await UserAwardService.grantAward({
        userId,
        awardId,
      });

      return res.status(200).json({ awards: updatedAwards });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}

export { UserAwardController };
