// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig";
import { HttpException } from "../utils/http.exception";

// Interfaz para extender Request con el usuario
export interface AuthRequest extends Request {
  user?: any;
}

export class AuthMiddleware {
  static authenticate(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): void {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw HttpException.unauthorized("Authorization token is required");
      }
      console.log("Authorization header:", authHeader); // Debugging line

      const token = authHeader.split(" ")[1];
      if (!token) {
        throw HttpException.unauthorized("Token format is invalid");
      }

      try {
        const decoded = jwt.verify(token, envConfig.JWT_SECRET);
        console.log("Decoded token:", decoded); // Debugging line
        req.user = decoded;
        console.log("User from token:", req.user); // Debugging line
        next();
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          throw HttpException.unauthorized("Token has expired hola");
        } else if (error instanceof jwt.JsonWebTokenError) {
          throw HttpException.unauthorized("Invalid token signature");
        } else {
          throw HttpException.unauthorized("Token validation failed");
        }
      }
    } catch (error) {
      next(error);
    }
  }
}
