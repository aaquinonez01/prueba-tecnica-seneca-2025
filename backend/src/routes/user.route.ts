// src/routes/user.route.ts
import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { ValidationMiddleware } from "../middleware/validation.middleware";
import { UserValidation } from "../validations/user.validation";

export class UserRoute {
  public router: Router;
  public path = "/users";

  constructor(private userController: UserController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Obtener perfil de usuario
    this.router.get(
      "/profile",
      AuthMiddleware.authenticate,
      this.userController.getProfile.bind(this.userController)
    );

    // Actualizar perfil de usuario
    this.router.put(
      "/profile",
      AuthMiddleware.authenticate,
      UserValidation.updateProfile,
      ValidationMiddleware.validate,
      this.userController.updateProfile.bind(this.userController)
    );

    // Obtener último tiempo de inicio de sesión
    this.router.get(
      "/last-login",
      AuthMiddleware.authenticate,
      this.userController.getLastLoginTime.bind(this.userController)
    );

    // Crear usuario por defecto (solo para configuración inicial)
  }
}
