import { z } from "zod";

// register
export const registerSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Password phải >= 6 ký tự")
});

// login
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
}); 