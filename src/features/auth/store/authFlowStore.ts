import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  AuthFlowModeOrNull,
  NextAfterVerifyOrNull,
  ResetDetails,
  SignupDetails,
} from '../types/flow';
import { normalizePhoneToE164 } from '../utils/phone';

type AuthFlowState = {
  // shared
  mode: AuthFlowModeOrNull;
  phoneNumber: string;

  // signup-only
  firstName: string;
  lastName: string;

  // reset-only / shared (needed by reset-password endpoint: otp query)
  otp: string;

  // runtime-only (don’t persist)
  nextAfterVerify: NextAfterVerifyOrNull;

  // setters (atomic)
  setMode: (mode: AuthFlowModeOrNull) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setSignupName: (firstName: string, lastName: string) => void;
  setOtp: (otp: string) => void;
  setNextAfterVerify: (next: NextAfterVerifyOrNull) => void;

  // helpers (opinionated flow setters)
  setSignupDetails: (args: SignupDetails) => void;
  setResetDetails: (args: ResetDetails) => void;

  resetFlow: () => void;
};

const initial = {
  mode: null as AuthFlowModeOrNull,
  phoneNumber: '',
  firstName: '',
  lastName: '',
  otp: '',
  nextAfterVerify: null as NextAfterVerifyOrNull,
};

export const useAuthFlowStore = create<AuthFlowState>()(
  persist(
    (set) => ({
      ...initial,

      setMode: (mode) => set({ mode }),
      setPhoneNumber: (phoneNumber) => {
        try {
          const e164 = normalizePhoneToE164(phoneNumber);
          set({ phoneNumber: e164 || phoneNumber });
        } catch {
          set({ phoneNumber });
        }
      },
      setSignupName: (firstName, lastName) => set({ firstName, lastName }),
      setOtp: (otp) => set({ otp }),
      setNextAfterVerify: (nextAfterVerify) => set({ nextAfterVerify }),

      setSignupDetails: ({ phoneNumber, firstName, lastName }) => {
        set({
          mode: 'signup',
          phoneNumber: normalizePhoneToE164(phoneNumber),
          firstName,
          lastName,
          otp: '',
          nextAfterVerify: 'add-location',
        });
      },

      setResetDetails: ({ phoneNumber }) => {
        set({
          mode: 'reset',
          phoneNumber: normalizePhoneToE164(phoneNumber),
          firstName: '',
          lastName: '',
          otp: '',
          nextAfterVerify: 'reset-password',
        });
      },

      resetFlow: () => set({ ...initial }),
    }),
    {
      name: 'signup-flow-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
