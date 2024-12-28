import { z } from "zod";

export const SignInFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Harap gunakan alamat email yang valid." })
    .trim(),
  password: z
    .string()
    .min(1, { message: "Password harus diisi." })
    .min(8, { message: "Password minimal 8 karakter" })
    .max(32, { message: "Password maksimal 32 karakter" })
    .trim(),
});

export type SignInFormType = z.infer<typeof SignInFormSchema>;

export const SignUpFormSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }).trim(),
  mobilePhone: z
    .string()
    .min(1, { message: "Harap masukkan nomor telepon" })
    .min(10, { message: "Nomor telepon minimal 10 karakter" })
    .max(15, { message: "Nomor telepon maksimal 15 karakter" })
    .trim(),
  name: z
    .string()
    .min(2, { message: "Nama minimal terdiri dari 2 karakter" })
    .max(50, { message: "Nama maksimal terdiri dari 50 karakter" }),
  password: z
    .string()
    .min(1, { message: "Password wajib diisi" })
    .min(8, { message: "Password minimal terdiri dari 8 karakter" })
    .max(32, { message: "Password maksimal terdiri dari 32 karakter" })
    .trim(),
});

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;
