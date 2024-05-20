import { Router } from "express";
import { CalendarController } from "@controllers/calendarController";
import { verifyTokenMiddleware } from "@middlewares/auth";

const router = Router();

router.post("/", verifyTokenMiddleware, CalendarController.create);
router.get("/", verifyTokenMiddleware, CalendarController.getAll);
router.put("/:id", verifyTokenMiddleware, CalendarController.updateById);

export default router;
