export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  birthDate: Date;
  password: string;
}

export interface UserUpdateData {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  birthDate: Date | string;
}
