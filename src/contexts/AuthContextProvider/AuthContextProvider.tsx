"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useReducer, ReactNode, useEffect } from "react";
import { LOCAL_STORAGE_TOKEN_NAME } from "../Constants/constants";
import authReducer, { AuthState } from "@/reducers/authReducer";
import api from "@/utils/api";
import { Account } from "@/types/User";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

interface LoginData {
  success: boolean;
  accessToken?: string;
  message?: string;
}

interface AuthContextTypes {
  authState: AuthState;
  login: (
    account: Account
  ) => Promise<{ success: boolean; token?: string; data?: LoginData; message?: string }>;
  logout: () => void;
}

const defaultValue: AuthContextTypes = {
  authState: {
    isAuthenticated: false,
    user: null,
  },
  login: () => Promise.resolve({ success: false }),
  logout: () => {},
};
// Tạo Context
export const AuthContext = createContext<AuthContextTypes>(defaultValue);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Load User (-- Khi đăng nhập hoặc đăng xuất isAuthenticated sẽ thay đổi --)
  const loadUser = async () => {
    try {
      const response = await api.get("/auth/authAdmin");

      if (response.data.success) {
        dispatch({ type: "LOGIN", payload: { isAuthenticated: true, user: response.data.user } });
      }
    } catch {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      dispatch({ type: "LOGOUT" });
    }
  };

  // useEffect
  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)) {
      loadUser();
    }
  }, []);

  //Login
  const login = async (
    account: Account
  ): Promise<{ success: boolean; token?: string; data?: LoginData; message?: string }> => {
    try {
      const response = await api.post("/auth/loginAdmin", account);
      // Lưu token vào local storage
      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
        // Gọi loadUser ngay sau khi đăng nhập thành công
        await loadUser();
      }

      // Trả về data
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  };
  //Logout
  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({ type: "LOGOUT" });
  };

  const authContextValue = { authState, login, logout };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
