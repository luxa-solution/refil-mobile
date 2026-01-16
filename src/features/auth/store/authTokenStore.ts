import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
};

type AuthTokenState = {
  tokens: AuthTokens | null;
  setTokens: (tokens: AuthTokens | null) => void;
  clearTokens: () => void;

  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
};

export const useAuthTokenStore = create<AuthTokenState>()(
  persist(
    (set, get) => ({
      tokens: null,

      setTokens: (tokens) => set({ tokens }),
      clearTokens: () => set({ tokens: null }),

      getAccessToken: () => get().tokens?.accessToken ?? null,
      getRefreshToken: () => get().tokens?.refreshToken ?? null,
    }),
    {
      name: 'auth-token-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
