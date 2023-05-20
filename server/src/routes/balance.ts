import { BalanceController } from "@controllers/balanceController";
import { verifyTokenMiddleware } from "@middlewares/auth";
import { Router } from "express";

const router = Router();

router.get("/", verifyTokenMiddleware, BalanceController.getUserBalance);
router.post(
  "/update",
  verifyTokenMiddleware,
  BalanceController.updateUserBalance
);

export default router;
