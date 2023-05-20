import { UserAwardController } from "@controllers/userAwardController";
import { verifyTokenMiddleware } from "@middlewares/auth";
import { Router } from "express";

const router = Router();

router.get("/", verifyTokenMiddleware, UserAwardController.getUserAwards);
router.post("/grant", verifyTokenMiddleware, UserAwardController.grantAward);

export default router;
