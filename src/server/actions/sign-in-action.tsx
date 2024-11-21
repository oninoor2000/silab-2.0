"use server";

import { signIn } from "../auth";
import { AuthError } from "next-auth";
import type { SignInResultType } from "~/typeSchema/sign-in-types";
import { SignInFormSchema, type SignInFormType } from "~/zodSchema";

// Function to validate login fields using zod schema
const validateLoginFields = (
  val: SignInFormType,
): { email: string; password: string } => {
  const validatedFields = SignInFormSchema.safeParse(val);

  if (!validatedFields.success) {
    throw new Error("Email atau password yang anda masukkan tidak valid");
  }

  return validatedFields.data;
};

// Main function to handle login action
export const SignInAction = async (
  val: SignInFormType,
): Promise<SignInResultType> => {
  try {
    const { email, password } = validateLoginFields(val);

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true, message: "Login berhasil" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError":
          return {
            success: false,
            message:
              error.cause?.err?.message ??
              "Mohon periksa kembali kredensial anda lalu coba lagi",
          };
        default:
          return {
            success: false,
            message:
              error.cause?.err?.message ??
              "Terjadi kesalahan ketika mencoba masuk",
          };
      }
    }

    throw error;
  }
};
