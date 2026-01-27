import { z } from 'zod';
import { phoneSchema } from './phone.schema';

export const forgotPasswordSchema = z.object({
  phoneNumber: phoneSchema,
});

export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
