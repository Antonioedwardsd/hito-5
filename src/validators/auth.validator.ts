import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export const registerSchema = loginSchema.extend({
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});
