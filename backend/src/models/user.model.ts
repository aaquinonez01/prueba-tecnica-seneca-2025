export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string | null;
  lastName: string | null;
  address: string | null;
  birthDate: Date | null;
  isActive: boolean;
  activationToken: string | null;
  resetToken: string | null;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
