import { AxiosError } from "axios";
import { ApiLoginResponse, ApiResponse } from "../types/apiResponse";
import { User } from "../types/User";
import { UserData, UserUpdateData } from "../types/UserData";
import API from "./api";

export const register = async (
  userData: UserData
): Promise<ApiResponse<User | null>> => {
  try {
    const response = await API.post<ApiResponse<User>>(
      "/auth/register",
      userData
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      const response = err.response.data as ApiResponse<User>;
      return response;
    } else if (err.request) {
      // The request was made but no response was received
      console.error("No response received:", err.request);
      return {
        status: "error",
        message: "Error al realizar la solicitud",
        data: null,
        ok: false,
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", err.message);
      return {
        status: "error",
        message: err.message,
        data: null,
        ok: false,
      };
    }
  }
};

export const login = async (
  email: string,
  password: string
): Promise<ApiLoginResponse> => {
  try {
    const response = await API.post<ApiLoginResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      const response = err.response.data as ApiLoginResponse;
      return response;
    } else if (err.request) {
      // The request was made but no response was received
      console.error("No response received:", err.request);
      return {
        status: "error",
        message: "Error al realizar la solicitud",
        data: null,
        ok: false,
      };
    } else {
      console.error("Error message:", err.message);
      return {
        status: "error",
        message: err.message,
        data: null,
        ok: false,
      };
    }
  }
};

export const activateAccount = async (
  token: string
): Promise<ApiResponse<null>> => {
  try {
    const response = await API.get<ApiResponse<null>>(
      `/auth/activate/${token}`
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      const response = err.response.data as ApiResponse<null>;
      return response;
    } else if (err.request) {
      console.error("No response received:", err.request);
      return {
        status: "error",
        message: "Error al realizar la solicitud",
        data: null,
        ok: false,
      };
    } else {
      console.error("Error message:", err.message);
      return {
        status: "error",
        message: err.message,
        data: null,
        ok: false,
      };
    }
  }
};

export const checkAuthToken = async (): Promise<ApiLoginResponse> => {
  try {
    const response = await API.get<ApiResponse<null>>(`/auth/verify`);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      const response = err.response.data as ApiResponse<null>;
      return response;
    } else if (err.request) {
      console.error("No response received:", err.request);
      return {
        status: "error",
        message: "Error al realizar la solicitud",
        data: null,
        ok: false,
      };
    } else {
      console.error("Error message:", err.message);
      return {
        status: "error",
        message: err.message,
        data: null,
        ok: false,
      };
    }
  }
};

export const forgotPassword = async (
  email: string
): Promise<ApiResponse<null>> => {
  try {
    const response = await API.post<ApiResponse<null>>(
      "/auth/forgot-password",
      { email }
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      const response = err.response.data as ApiResponse<null>;
      return response;
    } else if (err.request) {
      console.error("No response received:", err.request);
      return {
        status: "error",
        message: "Error al realizar la solicitud",
        data: null,
        ok: false,
      };
    } else {
      console.error("Error message:", err.message);
      return {
        status: "error",
        message: err.message,
        data: null,
        ok: false,
      };
    }
  }
};

export const updateProfile = async (
  userData: UserUpdateData
): Promise<ApiResponse<User | null>> => {
  try {
    const response = await API.put<ApiResponse<User>>(
      `/users/profile`,
      userData
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      const response = err.response.data as ApiResponse<User>;
      return response;
    } else if (err.request) {
      console.error("No response received:", err.request);
      return {
        status: "error",
        message: "Error al realizar la solicitud",
        data: null,
        ok: false,
      };
    } else {
      console.error("Error message:", err.message);
      return {
        status: "error",
        message: err.message,
        data: null,
        ok: false,
      };
    }
  }
};

export const resetPassword = async (
  token: string,
  password: string
): Promise<ApiResponse<null>> => {
  try {
    const response = await API.post<ApiResponse<null>>(`/auth/reset-password`, {
      newPassword: password,
      token,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      const response = err.response.data as ApiResponse<null>;
      return response;
    } else if (err.request) {
      console.error("No response received:", err.request);
      return {
        status: "error",
        message: "Error al realizar la solicitud",
        data: null,
        ok: false,
      };
    } else {
      console.error("Error message:", err.message);
      return {
        status: "error",
        message: err.message,
        data: null,
        ok: false,
      };
    }
  }
};
