// src/controllers/user.controller.ts
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { UserDto } from "../dtos/user.dto";
import { ApiResponse } from "../utils/api.response";
import { HttpException } from "../utils/http.exception";
import { AuthRequest } from "../middleware/auth.middleware";

export class UserController {
  constructor(private userService: UserService) {}

  async getProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // El usuario ya está validado por el middleware de autenticación
      const userId = req.user?.id;

      if (!userId) {
        throw HttpException.unauthorized(
          "ID de usuario no encontrado en el token"
        );
      }

      const user = await this.userService.getUserById(userId);

      res
        .status(200)
        .json(
          ApiResponse.success(user, "Perfil de usuario obtenido exitosamente")
        );
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw HttpException.unauthorized(
          "ID de usuario no encontrado en el token"
        );
      }

      const updateData: UserDto.UpdateUserDto = req.body;
      const updatedUser = await this.userService.updateProfile(
        userId,
        updateData
      );

      res
        .status(200)
        .json(
          ApiResponse.success(updatedUser, "Perfil actualizado exitosamente")
        );
    } catch (error) {
      next(error);
    }
  }

  async getLastLoginTime(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw HttpException.unauthorized(
          "ID de usuario no encontrado en el token"
        );
      }

      const user = await this.userService.getUserById(userId);

      res
        .status(200)
        .json(
          ApiResponse.success(
            { lastLogin: user.lastLogin },
            "Último inicio de sesión obtenido exitosamente"
          )
        );
    } catch (error) {
      next(error);
    }
  }
}
