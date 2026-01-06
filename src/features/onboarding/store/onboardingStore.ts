import { createMMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const mmkvStorage = createMMKV();

const zustandStorage = {
  setItem: (name: string, value: string) => {
    mmkvStorage.set(name, value);
  },
  getItem: (name: string) => {
    return mmkvStorage.getString(name) ?? null;
  },
  removeItem: (name: string) => {
    mmkvStorage.remove(name);
  },
};

type OnboardingState = {
  hasOnboarded: boolean;
  setHasOnboarded: (status: boolean) => void;
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasOnboarded: false,
      setHasOnboarded: (status) => set({ hasOnboarded: status }),
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
