import crypto from "crypto";

export class TokenUtils {
  static generateActivationToken(): string {
    return crypto.randomBytes(32).toString("hex");
  }

  static generateResetToken(): string {
    return crypto.randomBytes(32).toString("hex");
  }
}
