// src/middlewares/errorMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { HttpException } from "../utils/http.exception";
import { ApiResponse } from "../utils/api.response";

export class ErrorMiddleware {
  static handle(
    error: Error | HttpException,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    console.error(`[${req.method}] ${req.path} >> `, error);

    // Si es un error HTTP personalizado
    if (error instanceof HttpException) {
      res
        .status(error.statusCode)
        .json(ApiResponse.error(error.message, error.statusCode, error.data));
      return;
    }

    // Error de JWT
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      res
        .status(401)
        .json(ApiResponse.error("El token de sesion ha expirado", 401));
      return;
    }

    // Error de validación (express-validator)
    if (error.name === "ValidationError") {
      res
        .status(400)
        .json(
          ApiResponse.error("Validation error", 400, (error as any).errors)
        );
      return;
    }

    // Error genérico
    res
      .status(500)
      .json(
        ApiResponse.error(
          "Error interno del servidor, comuniquese con el administrador",
          500
        )
      );
  }
}
