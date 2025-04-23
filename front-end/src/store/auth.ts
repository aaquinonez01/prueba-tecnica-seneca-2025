import { create } from "zustand";
import { User } from "../types/User";
import { UserData, UserUpdateData } from "../types/UserData";
import {
  register,
  login,
  activateAccount,
  checkAuthToken,
  updateProfile,
  forgotPassword,
  resetPassword,
} from "../services/auth.service";

interface AuthState {
  user: User | null;
  authStatus: "unauthenticated" | "authenticated" | "checking";
  isLoading: boolean;
  error: string | null;
  success: string | null;
  checkAuthStatus: () => void;
  register: (user: UserData) => void;
  login: (user: User) => void;
  logout: () => void;
  forgotPassword: (email: string) => void;
  activateAccount: (token: string) => void;
  updateProfileUser: (user: UserUpdateData) => void;
  resetPassword: (token: string, password: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  error: null,
  success: null,
  authStatus: "checking",
  isLoading: false,
  checkAuthStatus: async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const response = await checkAuthToken();
      console.log("Token check response:", response);
      if (response.ok) {
        set({
          user: response.data?.user,
          authStatus: "authenticated",
          isLoading: false,
          error: null,
        });
      } else {
        console.error("Token check failed:", response.message);
        set({
          user: null,
          authStatus: "unauthenticated",
          isLoading: false,
          error: response.message,
        });
      }
    } else {
      set({ authStatus: "unauthenticated", isLoading: false });
    }
  },
  register: async (userData: UserData) => {
    set({ isLoading: true });
    try {
      const response = await register(userData);
      if (response.ok) {
        set({
          user: response.data,
          success: response.message,
          isLoading: false,
          error: null,
        });
      } else {
        console.error("Registration failed:", response.message);
        set({
          user: null,
          authStatus: "unauthenticated",
          isLoading: false,
          error: response.message,
          success: null,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      set({
        user: null,
        authStatus: "unauthenticated",
        isLoading: false,
        error: "Error during registration",
      });
    }
  },
  login: async (user: User) => {
    set({ user, authStatus: "checking", isLoading: true });
    try {
      const response = await login(user.email, user.password);
      console.log("Login response:", response);
      if (response.ok) {
        localStorage.setItem("token", response.data?.token || "");
        set({
          user: response.data?.user || null,
          authStatus: "authenticated",
          isLoading: false,
          error: null,
        });
      } else {
        console.error("Login failed:", response.message);
        set({
          user: null,
          authStatus: "unauthenticated",
          isLoading: false,
          error: response.message,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      set({
        user: null,
        authStatus: "unauthenticated",
        isLoading: false,
        error: "Error during login",
      });
    }
    set({ user, authStatus: "authenticated", isLoading: false });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, authStatus: "unauthenticated", isLoading: false });
  },
  activateAccount: async (token: string) => {
    set({ isLoading: true });
    try {
      const response = await activateAccount(token);
      if (response.ok) {
        set({
          success: response.message,
          isLoading: false,
          error: null,
        });
      } else {
        console.error("Activation failed:", response.message);
        set({
          isLoading: false,
          error: response.message,
          success: null,
        });
      }
    } catch (error) {
      console.error("Error during activation:", error);
      set({
        isLoading: false,
        error: "Error during activation",
        success: null,
      });
    }
  },
  updateProfileUser: async (userData: UserUpdateData) => {
    set({ isLoading: true });
    try {
      const response = await updateProfile(userData);
      if (response.ok) {
        set({
          user: response.data,
          success: response.message,
          isLoading: false,
          error: null,
        });
      } else {
        console.error("Profile update failed:", response.message);
        set({
          user: null,
          authStatus: "unauthenticated",
          isLoading: false,
          error: response.message,
          success: null,
        });
      }
    } catch (error) {
      console.error("Error during profile update:", error);
      set({
        user: null,
        authStatus: "unauthenticated",
        isLoading: false,
        error: "Error during profile update",
      });
    }
  },
  forgotPassword: async (email: string) => {
    set({ isLoading: true });
    try {
      const response = await forgotPassword(email);
      if (response.ok) {
        set({
          success: response.message,
          isLoading: false,
          error: null,
        });
      } else {
        console.error("Forgot password failed:", response.message);
        set({
          isLoading: false,
          error: response.message,
          success: null,
        });
      }
    } catch (error) {
      console.error("Error during forgot password:", error);
      set({
        isLoading: false,
        error: "Error during forgot password",
        success: null,
      });
    }
  },
  resetPassword: async (token: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await resetPassword(token, password);
      if (response.ok) {
        set({
          success: response.message,
          isLoading: false,
          error: null,
        });
      } else {
        console.error("Reset password failed:", response.message);
        set({
          isLoading: false,
          error: response.message,
          success: null,
        });
      }
    } catch (error) {
      console.error("Error during reset password:", error);
      set({
        isLoading: false,
        error: "Error during reset password",
        success: null,
      });
    }
  },
}));
