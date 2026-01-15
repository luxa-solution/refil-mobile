export function normalizePhone(input: string) {
  return input.replace(/[^\d+]/g, '');
}

export function isValidPhone(input: string) {
  const digits = input.replace(/\D/g, '');
  return digits.length >= 8;
}
