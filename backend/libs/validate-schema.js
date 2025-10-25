import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be 8 characters"),
  name: z.string().min(3, "Name must contain at least 3 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be 8 characters"),
});

export { registerSchema, loginSchema };
