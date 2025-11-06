import { create } from "zustand";
import { AuthRequest } from "../entities/auth-entities";

type AuthState = {
  authUser: AuthRequest | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  login: (token: string, user: AuthRequest) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  accessToken: null,
  isLoggedIn: false,

  login: (token: string, user: AuthRequest) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("accessToken", token);
      sessionStorage.setItem("authUser", JSON.stringify(user));
    }
    set({ accessToken: token, authUser: user, isLoggedIn: true });
  },
}));
