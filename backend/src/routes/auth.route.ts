// src/routes/auth.route.ts
import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { ValidationMiddleware } from "../middleware/validation.middleware";
import { UserValidation } from "../validations/user.validation";
import { AuthMiddleware } from "../middleware/auth.middleware";

export class AuthRoute {
  public router: Router;
  public path = "/auth";

  constructor(private authController: AuthController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Registro de usuarios
    this.router.post(
      "/register",
      UserValidation.register,
      ValidationMiddleware.validate,
      this.authController.register.bind(this.authController)
    );

    // Inicio de sesión
    this.router.post(
      "/login",
      UserValidation.login,
      ValidationMiddleware.validate,
      this.authController.login.bind(this.authController)
    );

    // Verificación/revalidación de token
    this.router.get(
      "/verify",
      AuthMiddleware.authenticate,
      this.authController.verifyToken.bind(this.authController)
    );

    // Activación de cuenta
    this.router.get(
      "/activate/:token",
      this.authController.activateAccount.bind(this.authController)
    );

    // Solicitud de restablecimiento de contraseña
    this.router.post(
      "/forgot-password",
      UserValidation.passwordResetRequest,
      ValidationMiddleware.validate,
      this.authController.requestPasswordReset.bind(this.authController)
    );

    // Restablecimiento de contraseña
    this.router.post(
      "/reset-password",
      UserValidation.passwordChange,
      ValidationMiddleware.validate,
      this.authController.resetPassword.bind(this.authController)
    );
  }
}
