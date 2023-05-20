import { AuthenticationController } from "@controllers/authenticationController";
import { verifyTokenMiddleware } from "@middlewares/auth";
import { Router } from "express";

const router = Router();

router.post("/register", AuthenticationController.register);
router.post("/login", AuthenticationController.login);
router.post(
  "/me",
  verifyTokenMiddleware,
  AuthenticationController.checkAuthentication
);
router.post("/logout", AuthenticationController.logout);

export default router;
