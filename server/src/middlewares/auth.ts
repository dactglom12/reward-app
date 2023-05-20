import { AUTH_TOKEN_COOKIE_NAME } from "@constants/index";
import { verifyJwtToken } from "@utils/authUtils";
import { Request, Response, NextFunction } from "express";

export const verifyTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies[AUTH_TOKEN_COOKIE_NAME];

  if (!token) {
    return res
      .status(403)
      .json({ error: "A token is required for authentication" });
  }

  try {
    const decoded = verifyJwtToken(token);
    // TODO: bring types in here
    (req as any).user = decoded;
  } catch (err) {
    return res.status(401).json({ error: "Invalid Token" });
  }

  return next();
};
