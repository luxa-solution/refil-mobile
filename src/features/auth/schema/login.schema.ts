import { z } from 'zod';
import { phoneSchema } from './phone.schema';

export const loginSchema = z.object({
  phoneNumber: phoneSchema,
  password: z.string().min(1, 'Enter your password'),
});

export type LoginForm = z.infer<typeof loginSchema>;
