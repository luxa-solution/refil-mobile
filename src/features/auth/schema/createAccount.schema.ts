import { z } from 'zod';
import { phoneSchema } from './phone.schema';

export const createAccountSchema = z.object({
  phoneNumber: phoneSchema,
  firstName: z.string().trim().min(1, 'First name required'),
  lastName: z.string().trim().min(1, 'Last name required'),
});

export type CreateAccountForm = z.infer<typeof createAccountSchema>;
