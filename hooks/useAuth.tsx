import { create } from "zustand";
type Auth = {
  auth: { user: IUser | null; checking: boolean };
  login: (user: IUser) => void;
  logout: () => void;
  setChecking: (checking: boolean) => void;
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
}));
export const useAuth = authStore;
