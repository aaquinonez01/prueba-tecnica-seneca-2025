import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig";
import { HttpException } from "./http.exception";

export class JwtUtils {
  static generateToken(payload: { id: number; email: string }): string {
    try {
      const secret: jwt.Secret = envConfig.JWT_SECRET as string;
      return jwt.sign(payload, secret, {
        expiresIn: envConfig.JWT_EXPIRES_IN,
      });
    } catch (error) {
      throw HttpException.internal("Failed to generate token");
    }
  }

  static verifyToken(token: string): any {
    try {
      const secret: jwt.Secret = envConfig.JWT_SECRET as string;
      return jwt.verify(token, secret);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw HttpException.unauthorized("Token has expired");
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw HttpException.unauthorized("Invalid token");
      } else {
        throw HttpException.unauthorized("Token validation failed");
      }
    }
  }
}
