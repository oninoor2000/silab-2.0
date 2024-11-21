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
