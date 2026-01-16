import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AuthTokens } from '../types/token';

type AuthTokenState = {
  accessToken: string | null;
  refreshToken: string | null;

  setTokens: (tokens: AuthTokens) => void;
  clearTokens: () => void;
};

const initial = {
  accessToken: null as string | null,
  refreshToken: null as string | null,
};

export const useAuthTokenStore = create<AuthTokenState>()(
  persist(
    (set) => ({
      ...initial,

      setTokens: ({ accessToken, refreshToken }) =>
        set({
          accessToken,
          refreshToken: refreshToken ?? null,
        }),

      clearTokens: () => set({ ...initial }),
    }),
    {
      name: 'auth-token-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
