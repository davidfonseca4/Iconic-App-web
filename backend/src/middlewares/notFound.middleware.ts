import { Request, Response } from "express";

export const notFoundMiddleware = (_req: Request, res: Response): void => {
  res.status(404).json({
    error: "NOT_FOUND",
    message: "Route not found"
  });
};
