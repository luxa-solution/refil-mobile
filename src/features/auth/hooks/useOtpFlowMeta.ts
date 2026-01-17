import { useMemo } from 'react';
import { useAuthFlowStore } from '../store/authFlowStore';

export function useOtpFlowMeta() {
  const mode = useAuthFlowStore((s) => s.mode);
  const phoneNumber = useAuthFlowStore((s) => s.phoneNumber);

  const dots = useMemo(() => {
    const dotsCount = mode === 'signup' ? 4 : 3;
    const activeIndex = mode === 'signup' ? 3 : 2;
    return { dotsCount, activeIndex };
  }, [mode]);

  return { mode, phoneNumber, dots };
}
