export type ApiOk<T> = {
  ok: true;
  data: T;
  status: number;
};

export type ApiErr = {
  ok: false;
  error: string;
  status: number;
  details?: unknown;
};

export type ApiResult<T> = ApiOk<T> | ApiErr;

export function toApiError(e: any): ApiErr {
  const status = e?.response?.status ?? 0;
  const details = e?.response?.data ?? e;

  const msg =
    details?.message ||
    details?.error ||
    (typeof details === 'string' ? details : null) ||
    e?.message ||
    'Network error';

  return {
    ok: false,
    status,
    error: String(msg),
    details,
  };
}
