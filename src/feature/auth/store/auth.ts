import { create } from "zustand";
import { AuthRequest } from "../entities/auth-entities";

type State = {
  authUser: AuthRequest | null;
  isLoggedIn: boolean;
  setToken: (accessToken: string) => void;
  setAuthUser: (user?: AuthRequest | null) => void;
};

export const useAuthStore = create<State>((set) => ({
  authUser: null,
  isLoggedIn: false,
  setToken: (accessToken: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("accessToken", accessToken);
    }
    set({ isLoggedIn: true });
  },
  setAuthUser: (user?: AuthRequest | null) => {
    set({ authUser: user, isLoggedIn: !!user });
  },
}));
