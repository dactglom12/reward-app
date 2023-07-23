import { NEXT_DAY_DATE } from "@constants/date";
import { AUTH_TOKEN_COOKIE_NAME } from "@constants/index";
import { AuthenticationService } from "@services/authenticationService";
import { config } from "../env-config";
import { Request, Response } from "express";

class AuthenticationController {
  static async register(req: Request, res: Response) {
    try {
      const user = await AuthenticationService.register(req.body);

      res.cookie(AUTH_TOKEN_COOKIE_NAME, user.token, {
        httpOnly: true,
        expires: NEXT_DAY_DATE,
        secure: true,
        domain: config.reactAppDomain ?? "localhost",
      });

      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await AuthenticationService.login({ email, password });

      res.cookie(AUTH_TOKEN_COOKIE_NAME, user.token, {
        httpOnly: true,
        expires: NEXT_DAY_DATE,
        secure: true,
        domain: config.reactAppDomain ?? "localhost",
      });

      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  static async checkAuthentication(_req: Request, res: Response) {
    return res.status(200).json({ ok: true });
  }

  static async logout(_req: Request, res: Response) {
    res.clearCookie(AUTH_TOKEN_COOKIE_NAME);
    return res.status(204).json({ ok: true });
  }
}

export { AuthenticationController };
