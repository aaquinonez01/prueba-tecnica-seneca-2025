import { User } from "./User";

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T | null;
  ok: boolean;
}

export interface ApiLoginResponse {
  status: string;
  message: string;
  data: {
    token: string;
    user: User;
  } | null;
  ok: boolean;
}
