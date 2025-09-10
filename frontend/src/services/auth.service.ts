

import { AxiosError } from "axios";
import { api } from "./api";
import { LoginInput, RegisterInput, ResetPasswordInput } from "@/types/auth.type";

export const registerUser = async (userData: RegisterInput) => {
  try {
 
    const response = await api.post("auth/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (loginData: LoginInput) => {
  try {
    const response = await api.post("auth/login", loginData);
    if (!response.data) {
      throw new Error("Invalid Credentials!");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const response = await api.post("auth/verify-email", { token });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    const response = await api.post("auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(err.message || "Failed to send password reset instructions");
  }
};






export const resetPasswordWithToken = async (data: ResetPasswordInput) => {
  const payload = {
    recoveryAccessToken: data.token,
    newPassword: data.new_password,
  };

  const response = await api.post("/auth/reset-password", payload);
  return response.data;
};

