import { BalanceService } from "@services/balanceService";
import { Request, Response } from "express";

class BalanceController {
  static async getUserBalance(req: Request, res: Response) {
    try {
      // TODO: bring better typing here
      const userId = (req as unknown as { user: { userId: string } }).user
        .userId;
      const balance = await BalanceService.getUserBalance({ userId });

      return res.status(200).json({ balance });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  static async updateUserBalance(req: Request, res: Response) {
    try {
      // TODO: bring better typing here
      const userId = (req as unknown as { user: { userId: string } }).user
        .userId;
      const { updateSum } = req.body;

      const updatedBalance = await BalanceService.updateUserBalance({
        userId,
        updateSum,
      });

      return res.status(200).json({ balance: updatedBalance });
    } catch (err) {
      return res.status(400).json({ error: (err as any).message });
    }
  }
}

export { BalanceController };
