import { AwardController } from "@controllers/awardController";
import { verifyTokenMiddleware } from "@middlewares/auth";
import { Router } from "express";

const router = Router();

router.get("/", verifyTokenMiddleware, AwardController.getAll);
router.post("/", verifyTokenMiddleware, AwardController.create);

export default router;
