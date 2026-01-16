import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type AuthFlowMode = 'signup' | 'reset' | null;
export type NextAfterVerify = 'add-location' | 'reset-password' | null;

type AuthFlowState = {
  // shared
  mode: AuthFlowMode;
  phoneNumber: string;

  // signup-only
  firstName: string;
  lastName: string;

  // reset-only / shared (needed by reset-password endpoint: otp query)
  otp: string;

  // runtime-only (don’t persist)
  nextAfterVerify: 'add-location' | 'reset-password' | null;

  // setters (atomic)
  setMode: (mode: AuthFlowMode) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setSignupName: (firstName: string, lastName: string) => void;
  setOtp: (otp: string) => void;
  setNextAfterVerify: (next: AuthFlowState['nextAfterVerify']) => void;

  // helpers (opinionated flow setters)
  setSignupDetails: (args: { phoneNumber: string; firstName: string; lastName: string }) => void;
  setResetDetails: (args: { phoneNumber: string }) => void;

  resetFlow: () => void;
};

const initial = {
  mode: null as AuthFlowMode,
  phoneNumber: '',
  firstName: '',
  lastName: '',
  otp: '',
  nextAfterVerify: null as NextAfterVerify,
};

export const useAuthFlowStore = create<AuthFlowState>()(
  persist(
    (set) => ({
      ...initial,

      setMode: (mode) => set({ mode }),
      setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
      setSignupName: (firstName, lastName) => set({ firstName, lastName }),
      setOtp: (otp) => set({ otp }),
      setNextAfterVerify: (nextAfterVerify) => set({ nextAfterVerify }),

      setSignupDetails: ({ phoneNumber, firstName, lastName }) =>
        set({
          mode: 'signup',
          phoneNumber,
          firstName,
          lastName,
          otp: '',
          nextAfterVerify: 'add-location',
        }),

      setResetDetails: ({ phoneNumber }) =>
        set({
          mode: 'reset',
          phoneNumber,
          firstName: '',
          lastName: '',
          otp: '',
          nextAfterVerify: 'reset-password',
        }),

      resetFlow: () => set({ ...initial }),
    }),
    {
      name: 'signup-flow-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // do not persist runtime-only routing
      partialize: ({ nextAfterVerify, ...rest }) => rest,
    }
  )
);
