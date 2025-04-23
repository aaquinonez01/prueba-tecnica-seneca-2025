// src/services/user.service.ts
import { User } from "@prisma/client";
import { UserRepository } from "../repositories/user.repository";
import { UserDto } from "../dtos/user.dto";
import { HttpException } from "../utils/http.exception";
import bcrypt from "bcryptjs";
import { EmailService } from "./email.service";
import { TokenUtils } from "../utils/token.utils";

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService = new EmailService()
  ) {}

  async getUserById(id: number): Promise<UserDto.UserResponseDto> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw HttpException.notFound("User not found");
    }

    return this.mapUserToDto(user);
  }

  async updateProfile(
    id: number,
    data: UserDto.UpdateUserDto
  ): Promise<UserDto.UserResponseDto> {
    // Verificar si el usuario existe
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw HttpException.notFound("User not found");
    }

    // Actualizar el usuario
    const updatedUser = await this.userRepository.update(id, data);

    return this.mapUserToDto(updatedUser);
  }

  async activateAccount(token: string): Promise<boolean> {
    const user = await this.userRepository.findByActivationToken(token);

    if (!user) {
      throw HttpException.badRequest("Invalid activation token");
    }

    await this.userRepository.update(user.id, {
      isActive: true,
      activationToken: undefined,
    });

    return true;
  }

  async resetPasswordRequest(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      // Por seguridad, no revelamos si el email existe o no
      return false;
    }

    // Generar token único
    const resetToken = TokenUtils.generateResetToken();

    await this.userRepository.updateResetToken(user.id, resetToken);

    // Aquí se enviaría el email con el token (implementación omitida)

    await this.emailService.sendPasswordResetEmail(user.email, resetToken);

    return true;
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const user = await this.userRepository.findByResetToken(token);

    if (!user) {
      throw HttpException.badRequest("Invalid or expired reset token");
    }

    // Hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña y eliminar el token
    await this.userRepository.update(user.id, {
      password: hashedPassword,
      resetToken: undefined,
    });

    return true;
  }

  // Método para mapear de User a DTO (eliminando datos sensibles)
  private mapUserToDto(user: User): UserDto.UserResponseDto {
    const { password, activationToken, resetToken, ...userResponse } =
      user as any;
    return userResponse;
  }
}
