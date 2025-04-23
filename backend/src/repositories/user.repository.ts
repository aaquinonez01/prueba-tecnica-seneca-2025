import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";
import { UserDto } from "../dtos/user.dto";

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(
    data: UserDto.CreateUserDto & { activationToken?: string }
  ): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async update(id: number, data: UserDto.UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  async updatePassword(id: number, password: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        password,
        updatedAt: new Date(),
      },
    });
  }

  async updateActivationStatus(id: number, isActive: boolean): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        isActive,
        updatedAt: new Date(),
      },
    });
  }

  async updateResetToken(id: number, resetToken: string | null): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        resetToken,
        updatedAt: new Date(),
      },
    });
  }

  async updateLastLogin(id: number): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        lastLogin: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async findByActivationToken(token: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { activationToken: token },
    });
  }

  async findByResetToken(token: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { resetToken: token },
    });
  }
}
