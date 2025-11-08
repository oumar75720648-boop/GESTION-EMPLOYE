import { create } from "zustand";
import { User } from "../entities/auth-entities"; 

type State = {
  authUser: User | null;            
  isLoggedIn: boolean;
  setToken: (accessToken: string) => void;
  setAuthUser: (user?: User | null) => void;
  logout: (redirectTo?: string) => void;
};

export const useAuthStore = create<State>((set:any) => ({
  authUser: null,
  isLoggedIn: typeof window !== "undefined" 
    ? !!sessionStorage.getItem("accessToken")
    : false,

  setToken: (accessToken: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("accessToken", accessToken);
    }
    set({ isLoggedIn: true });
  },

  setAuthUser: (user?: User | null) => {
    if (typeof window !== "undefined" && user) {
      sessionStorage.setItem("authUser", JSON.stringify(user));
    }
    set({ authUser: user, isLoggedIn: !!user });
  },

  logout: (redirectTo?: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("authUser");
    }
    set({ isLoggedIn: false, authUser: null });

    if (redirectTo) location.href = redirectTo;
  },
}));
