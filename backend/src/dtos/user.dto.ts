// src/models/user.dto.ts
export namespace UserDto {
  // Para registro de usuarios
  export class CreateUserDto {
    email!: string;
    password!: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    birthDate?: Date;
  }

  // Para actualización de perfil
  export class UpdateUserDto {
    firstName?: string;
    lastName?: string;
    address?: string;
    birthDate?: Date;
    isActive?: boolean;
    password?: string;
    activationToken?: string;
    resetToken?: string;
  }

  // Para login
  export class LoginDto {
    email!: string;
    password!: string;
  }

  // Para recuperación de contraseña
  export class PasswordResetRequestDto {
    email!: string;
  }

  // Para cambio de contraseña
  export class PasswordChangeDto {
    token!: string;
    newPassword!: string;
  }

  // Para respuesta (sin datos sensibles)
  export class UserResponseDto {
    id!: number;
    email!: string;
    firstName?: string | null;
    lastName?: string | null;
    address?: string | null;
    birthDate?: Date | null;
    isActive!: boolean;
    lastLogin?: Date | null;
    createdAt!: Date;
    updatedAt!: Date;
  }

  // Para respuesta de autenticación
  export class AuthResponseDto {
    user!: UserResponseDto;
    token!: string;
  }
}
