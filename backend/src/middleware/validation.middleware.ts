import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { HttpException } from "../utils/http.exception";

export class ValidationMiddleware {
  static validate(req: Request, res: Response, next: NextFunction): void {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((err) => ({
        field: err.type,
        message: err.msg,
      }));

      next(HttpException.badRequest("Validation error", formattedErrors));
      return;
    }
    next();
  }
}
