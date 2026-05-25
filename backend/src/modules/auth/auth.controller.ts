import { NextFunction, Request, Response } from "express";
import { HttpError } from "../../middlewares/error.middleware";
import { getMe, loginUser, registerUser } from "./auth.service";
import { loginSchema, registerSchema } from "./auth.validator";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = registerSchema.parse(req.body);
    const user = await registerUser(payload);
    res.status(201).json({ data: user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = loginSchema.parse(req.body);
    const result = await loginUser(payload);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

export const me = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.id) {
      throw new HttpError(401, "UNAUTHORIZED", "Missing user context");
    }

    const user = await getMe(req.user.id);
    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};
