export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  birthDate: Date;
  password: string;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
