import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env";
import { HttpError } from "./error.middleware";

interface TokenPayload extends JwtPayload {
  sub: string;
  email: string;
  role: string;
}

export const authMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    next(new HttpError(401, "UNAUTHORIZED", "Missing Bearer token"));
    return;
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const decoded = jwt.verify(token, env.jwt.secret) as TokenPayload;
    req.user = {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role
    };
    next();
  } catch (_error) {
    next(new HttpError(401, "INVALID_TOKEN", "Token is invalid or expired"));
  }
};
