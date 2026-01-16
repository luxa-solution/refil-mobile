import { useCallback, useEffect, useMemo, useState } from 'react';

export function useOtp(length = 4) {
  const [value, setValue] = useState('');

  const setDigit = useCallback(
    (next: string) => {
      const cleaned = next.replace(/\D/g, '').slice(0, length);
      setValue(cleaned);
    },
    [length]
  );

  const isComplete = useMemo(() => value.length === length, [value, length]);
  const clear = useCallback(() => setValue(''), []);

  return { value, setDigit, isComplete, clear, length };
}

export function useResendTimer(seconds = 30) {
  const [remaining, setRemaining] = useState(0);

  const start = useCallback(() => setRemaining(seconds), [seconds]);

  useEffect(() => {
    if (remaining <= 0) return;
    const t = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(t);
  }, [remaining]);

  return { remaining, canResend: remaining <= 0, start };
}
