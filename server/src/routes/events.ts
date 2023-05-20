import { Router } from "express";
import { EventController } from "@controllers/eventController";
import { verifyTokenMiddleware } from "@middlewares/auth";

const router = Router();

router.post("/", verifyTokenMiddleware, EventController.create);
router.get("/", verifyTokenMiddleware, EventController.getAll);
router.put("/:id", verifyTokenMiddleware, EventController.updateById);

export default router;
