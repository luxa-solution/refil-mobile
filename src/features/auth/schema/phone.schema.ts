import { z } from 'zod';
import { isValidPhone } from '../utils/phone';

export const phoneSchema = z
  .string()
  .trim()
  .min(1, 'Phone number is required')
  .refine((v) => isValidPhone(v), 'Enter a valid phone number');

export type PhoneInput = z.infer<typeof phoneSchema>;
