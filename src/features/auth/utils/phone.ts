import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';

const DEFAULT_REGION = 'NG' as const;

export type PhoneParseResult = {
  raw: string;
  e164: string; // "+2348012345678"
  national: string; // "0801 234 5678" (or local format)
  international: string; // "+234 801 234 5678"
  country: string; // "NG"
};

export function formatPhoneAsYouType(input: string, region = DEFAULT_REGION) {
  return new AsYouType(region).input(input);
}

export function parsePhone(input: string, region = DEFAULT_REGION): PhoneParseResult | null {
  const raw = input.trim();

  const phone = parsePhoneNumberFromString(raw) || parsePhoneNumberFromString(raw, region);

  if (!phone || !phone.isValid()) return null;

  return {
    raw,
    e164: phone.number, // E.164
    national: phone.formatNational(),
    international: phone.formatInternational(),
    country: String(phone.country ?? region),
  };
}

export function isValidPhone(input: string, region = DEFAULT_REGION) {
  return !!parsePhone(input, region);
}

export function normalizePhoneToE164(input: string, region = DEFAULT_REGION) {
  return parsePhone(input, region)?.e164 ?? '';
}
