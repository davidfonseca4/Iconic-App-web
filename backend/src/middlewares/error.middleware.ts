import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export class HttpError extends Error {
  statusCode: number;
  code: string;

  constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      error: error.code,
      message: error.message
    });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      error: "VALIDATION_ERROR",
      message: "Invalid request payload",
      details: error.issues
    });
    return;
  }

  res.status(500).json({
    error: "INTERNAL_SERVER_ERROR",
    message: "Unexpected server error"
  });
};
