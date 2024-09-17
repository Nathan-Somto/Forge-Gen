import { UserData } from "@/lib/appwrite/user";
import { create } from "zustand";
type Auth = {
  auth: { user: UserData | null; checking: boolean };
  login: (user: UserData) => void;
  logout: () => void;
  setChecking: (checking: boolean) => void;
  updateUserInfo: (user: UserData) => void;
};
// useAuth - login, logout
const authStore = create<Auth>((set) => ({
  auth: {
    checking: false,
    user: null,
  },
  login: (user) =>
    set((state) => ({ auth: { user, checking: state.auth.checking } })),
  logout: () =>
    set((state) => ({ auth: { user: null, checking: state.auth.checking } })),
  setChecking: (checking) =>
    set((state) => ({ auth: { user: state.auth.user, checking } })),
  updateUserInfo: (user) =>
    set((state) => ({
      auth: {
        user: { ...state.auth.user, ...user },
        checking: state.auth.checking,
      },
    })),
}));
export const useAuth = authStore;
