// src/services/auth.service.ts
import { UserRepository } from "../repositories/user.repository";
import { UserDto } from "../dtos/user.dto";
import { HttpException } from "../utils/http.exception";
import { JwtUtils } from "../utils/jwt";
import { TokenUtils } from "../utils/token.utils";
import { EmailService } from "./email.service";
import bcrypt from "bcryptjs";

export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService = new EmailService()
  ) {}

  async register(
    userData: UserDto.CreateUserDto
  ): Promise<UserDto.UserResponseDto> {
    // Verificar si el email ya existe
    const existingUser = await this.userRepository.findByEmail(userData.email);

    if (existingUser) {
      throw HttpException.badRequest("El Correo ya esta registrado");
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Generar token de activación
    const activationToken = TokenUtils.generateActivationToken();

    // Crear el usuario
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
      activationToken,
    });

    // Enviar email de activación
    await this.emailService.sendActivationEmail(user.email, activationToken);

    // Mapear a DTO para respuesta
    return this.mapUserToDto(user);
  }

  async login(
    email: string,
    password: string
  ): Promise<UserDto.AuthResponseDto> {
    // Buscar usuario por email
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw HttpException.unauthorized(
        "El correo o la contraseña son incorrectos"
      );
    }

    // Verificar si la cuenta está activada
    if (!user.isActive) {
      throw HttpException.unauthorized(
        "La cuenta no está activada, por favor verifica tu correo electrónico"
      );
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw HttpException.unauthorized(
        "El correo o la contraseña son incorrectos"
      );
    }

    // Actualizar último login
    await this.userRepository.updateLastLogin(user.id);

    // Generar token JWT
    const token = JwtUtils.generateToken({
      id: user.id,
      email: user.email,
    });

    // Preparar respuesta
    return {
      user: this.mapUserToDto(user),
      token,
    };
  }

  async activateAccount(token: string): Promise<boolean> {
    // Buscar usuario por token de activación
    const user = await this.userRepository.findByActivationToken(token);

    if (!user) {
      throw HttpException.badRequest("Invalid activation token");
    }

    // Activar cuenta y eliminar token
    await this.userRepository.updateActivationStatus(user.id, true);

    return true;
  }

  async verifyToken(token: string): Promise<UserDto.UserResponseDto> {
    try {
      // Verificar token JWT
      const decoded = JwtUtils.verifyToken(token);
      console.log("Decoded token aqui:", decoded);
      // Obtener usuario
      const user = await this.userRepository.findById(decoded.id);

      if (!user) {
        throw HttpException.unauthorized("User not found");
      }

      return this.mapUserToDto(user);
    } catch (error) {
      throw HttpException.unauthorized("Invalid token or expired");
    }
  }

  // Método para mapear de User a DTO (eliminando datos sensibles)
  private mapUserToDto(user: any): UserDto.UserResponseDto {
    const { password, activationToken, resetToken, ...userResponse } = user;
    return userResponse;
  }
}
