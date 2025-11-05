import { create } from "zustand";
import { AuthRequest } from "../entities/auth-entities";

type State = {
  authUser: AuthRequest | null;
 
  setToken: (accessToken: string) => void;
  logout: (redirectTo?: string) => void;
  setAuthUser: (user?: AuthRequest | null) => void;
};

export const useAuthStore = create<State>((set) => ({
  authUser: null,
  isLoggedIn:
    sessionStorage.accessToken && sessionStorage.accessToken.toString() !== "",
  logout: (redirectTo?: string) => {
    sessionStorage.clear();
    set((state) => ({ ...state, isLoggedIn: false, authUser: null }));
    if (redirectTo) location.href = redirectTo;
  },
  setToken: (accessToken: string) => {
    sessionStorage.setItem("accessToken", accessToken);
    set((state) => ({ ...state, isLoggedIn: true }));
  },
  setAuthUser: (user?: AuthRequest | null) => {
    set((state) => ({ ...state, isLoggedIn: true, authUser: user }));
  },
}));
