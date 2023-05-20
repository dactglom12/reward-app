import { TaskController } from "@controllers/taskController";
import { verifyTokenMiddleware } from "@middlewares/auth";
import { Router } from "express";

const router = Router();

router.post("/complete", verifyTokenMiddleware, TaskController.complete);
router.get(
  "/completion",
  verifyTokenMiddleware,
  TaskController.isTaskCompletedToday
);

export default router;
