import { AwardService } from "@services/awardService";
import { Request, Response } from "express";

class AwardController {
  static async create(req: Request, res: Response) {
    try {
      const savedAward = await AwardService.createAward(req.body);

      return res.status(201).json({ award: savedAward });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  static async getAll(_req: Request, res: Response) {
    try {
      const awards = await AwardService.getAllAwards();

      return res.status(200).json({ awards });
    } catch (err) {
      return res.json({ error: err });
    }
  }
}

export { AwardController };
