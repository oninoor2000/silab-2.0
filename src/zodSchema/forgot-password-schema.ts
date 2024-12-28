import { z } from "zod";

// 1. Forgot Password Form Schema
export const forgotPasswordFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Harap gunakan alamat email yang valid." })
    .trim(),
});

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordFormSchema>;

// 2. Base Reset Password Form Schema (without refinement)
const baseResetPasswordFormSchema = z.object({
  password: z
    .string()
    .min(1, { message: "Password wajib diisi" })
    .min(8, { message: "Password minimal terdiri dari 8 karakter" })
    .max(32, { message: "Password maksimal terdiri dari 32 karakter" })
    .trim(),
  confirmPassword: z.string().trim(),
});

// 3. Reset Password Form Schema with Refinement
export const ResetPasswordFormSchema = baseResetPasswordFormSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Konfirmasi password tidak sesuai dengan password",
    path: ["confirmPassword"],
  },
);

export type ResetPasswordFormType = z.infer<typeof ResetPasswordFormSchema>;

// 4. Reset Password Form Schema with Token
export const ResetPasswordFormSchemaWithToken = baseResetPasswordFormSchema
  .extend({
    token: z.string().nonempty({ message: "Token wajib diisi." }),
  })
  .omit({ confirmPassword: true });

export type ResetPasswordFormSchemaWithTokenType = z.infer<
  typeof ResetPasswordFormSchemaWithToken
>;
