import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const signUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be 8 characters"),
    name: z.string().min(3, "Name must contain at least 3 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.confirmPassword === data.password, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
