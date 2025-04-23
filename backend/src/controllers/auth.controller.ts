// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { UserDto } from "../dtos/user.dto";
import { ApiResponse } from "../utils/api.response";
import { HttpException } from "../utils/http.exception";
import { JwtUtils } from "../utils/jwt";
import { AuthRequest } from "../middleware/auth.middleware";
import { UserService } from "../services/user.service";

export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData: UserDto.CreateUserDto = req.body;
      const result = await this.authService.register(userData);

      res
        .status(201)
        .json(
          ApiResponse.success(
            result,
            "Usuario registrado exitosamente. Por favor revisa tu correo para activar tu cuenta.",
            201
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password }: UserDto.LoginDto = req.body;

      if (!email || !password) {
        throw HttpException.badRequest(
          "El email y la contraseña son obligatorios"
        );
      }

      const result = await this.authService.login(email, password);

      res
        .status(200)
        .json(ApiResponse.success(result, "Inicio de sesión exitoso"));
    } catch (error) {
      next(error);
    }
  }

  async verifyToken(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // El usuario ya ha sido validado por el middleware de autenticación
      const userId = req.user?.id;

      if (!userId) {
        throw HttpException.unauthorized("Token inválido");
      }

      // Obtener datos actualizados del usuario
      const user = await this.userService.getUserById(req.user.id);

      // Generar un nuevo token con tiempo extendido
      const token = JwtUtils.generateToken({
        id: user.id,
        email: user.email,
      });

      res.status(200).json(
        ApiResponse.success(
          {
            user,
            token,
          },
          "Token validado correctamente"
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async activateAccount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { token } = req.params;

      if (!token) {
        throw HttpException.badRequest("El token de activación es obligatorio");
      }

      await this.authService.activateAccount(token);

      res
        .status(200)
        .json(ApiResponse.success(null, "Cuenta activada exitosamente"));
    } catch (error) {
      next(error);
    }
  }

  async requestPasswordReset(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email }: UserDto.PasswordResetRequestDto = req.body;

      if (!email) {
        throw HttpException.badRequest("El email es obligatorio");
      }

      await this.userService.resetPasswordRequest(email);

      // Siempre devolvemos éxito por seguridad, incluso si el email no existe
      res
        .status(200)
        .json(
          ApiResponse.success(
            null,
            "Si tu email existe en nuestro sistema, recibirás instrucciones para restablecer tu contraseña"
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { token, newPassword }: UserDto.PasswordChangeDto = req.body;

      if (!token || !newPassword) {
        throw HttpException.badRequest(
          "El token y la nueva contraseña son obligatorios"
        );
      }

      await this.userService.resetPassword(token, newPassword);

      res
        .status(200)
        .json(
          ApiResponse.success(
            null,
            "La contraseña ha sido restablecida exitosamente"
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // No hay lógica de backend para logout con JWT, solo informamos al cliente
      res
        .status(200)
        .json(ApiResponse.success(null, "Sesión cerrada exitosamente"));
    } catch (error) {
      next(error);
    }
  }
}
