import { useMemo } from 'react';
import { AuthFlowMode } from '../types/flow';

export function usePasswordScreenUI(mode: AuthFlowMode) {
  return useMemo(() => {
    if (mode === 'signup') {
      return {
        title: 'Add Password',
        primaryCta: 'Get Started',
        dots: { show: true, activeIndex: 2, count: 4 },
        passwordLabel: 'Password',
      };
    }

    return {
      title: 'Set New Password',
      primaryCta: 'Save',
      dots: { show: true, activeIndex: 3, count: 3 },
      passwordLabel: 'New Password',
    };
  }, [mode]);
}
