import { create } from "zustand";
import { User } from "../entities/auth-entities";

type State = {
  authUser: User | null;
  isLoggedIn: boolean; 
  setToken: (accessToken: string) => void; 
  setAuthUser: (user?: User | null) => void;
  logout: (redirectTo?: string) => void;
};

export const useAuthStore = create<State>((set) => ({
  authUser: null,
  isLoggedIn:
    typeof window !== "undefined"
      ? !!localStorage.getItem("accessToken")
      : false,

  setToken: (accessToken: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", accessToken);
    }
    set({ isLoggedIn: true });
  },

  setAuthUser: (user?: User | null) => {
    if (typeof window !== "undefined" && user) {
      localStorage.setItem("authUser", JSON.stringify(user));
    }
    set({ authUser: user, isLoggedIn: !!user });
  },

  logout: (redirectTo?: string) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("authUser");
    }
    set({ isLoggedIn: false, authUser: null });

    if (redirectTo) location.href = redirectTo;
  },
}));
