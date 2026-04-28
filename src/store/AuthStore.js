import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: true,

  login: (userData) => set({ user: userData, isLoggedIn: true, isLoading: false }),
  logout: () => set({ user: null, isLoggedIn: false, isLoading: false }),
}));