// src/routes/index.ts
import { Router } from "express";
import { AuthRoute } from "./auth.route";
import { UserRoute } from "./user.route";
import { AuthController } from "../controllers/auth.controller";
import { UserController } from "../controllers/user.controller";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { UserRepository } from "../repositories/user.repository";
import prisma from "../config/database";

export class Routes {
  public static initialize(): Router {
    const router = Router();

    // Crear instancias de repositorios
    const userRepository = new UserRepository(prisma);

    // Crear instancias de servicios
    const authService = new AuthService(userRepository);
    const userService = new UserService(userRepository);

    // Crear instancias de controladores
    const authController = new AuthController(authService, userService);
    const userController = new UserController(userService);

    // Crear e inicializar rutas directamente
    const authRoute = new AuthRoute(authController);
    const userRoute = new UserRoute(userController);

    console.log(`Montando ruta: ${authRoute.path}`);
    console.log(`Montando ruta: ${userRoute.path}`);

    // Registrar las rutas una por una en lugar de en un bucle
    router.use(authRoute.path, authRoute.router);
    router.use(userRoute.path, userRoute.router);

    return router;
  }
}
