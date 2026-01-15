import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type AuthFlowMode = 'signup' | 'reset' | null;

type AuthFlowState = {
  // shared
  mode: AuthFlowMode;
  phoneNumber: string;

  // signup-only
  firstName: string;
  lastName: string;

  // runtime-only (don’t persist)
  nextAfterVerify: 'add-location' | 'reset-password' | null;

  setMode: (mode: AuthFlowMode) => void;
  setPhoneNumber: (phoneNumber: string) => void;

  setSignupName: (firstName: string, lastName: string) => void;

  setNextAfterVerify: (next: AuthFlowState['nextAfterVerify']) => void;

  resetFlow: () => void;
};

const initial = {
  mode: null as AuthFlowMode,
  phoneNumber: '',
  firstName: '',
  lastName: '',
  nextAfterVerify: null as AuthFlowState['nextAfterVerify'],
};

export const useAuthFlowStore = create<AuthFlowState>()(
  persist(
    (set) => ({
      ...initial,

      setMode: (mode) => set({ mode }),
      setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
      setSignupName: (firstName, lastName) => set({ firstName, lastName }),

      setNextAfterVerify: (nextAfterVerify) => set({ nextAfterVerify }),

      resetFlow: () => set({ ...initial }),
    }),
    {
      name: 'auth-flow-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // do not persist runtime-only routing
      partialize: ({ nextAfterVerify, ...rest }) => rest,
    }
  )
);
