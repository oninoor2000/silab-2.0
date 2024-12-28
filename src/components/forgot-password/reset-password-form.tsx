"use client";
import React, { useCallback } from "react";

import {
  ResetPasswordFormSchema,
  type ResetPasswordFormType,
} from "~/zodSchema/forgot-password-schema";

import { toast } from "sonner";
import { api } from "~/trpc/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { LoadingButton } from "../ui/loading-button";
import { PasswordInput } from "../ui/custom/password-input";

const ResetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();

  const form = useForm<ResetPasswordFormType>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = api.forgotPassword.updatePassword.useMutation({
    onSuccess: () => {
      toast.success("Password berhasil diubah.", {
        description: "Silakan masuk menggunakan password baru.",
      });
      form.reset();
      router.push("/masuk");
    },
    onError(error) {
      form.reset();
      toast.error("Reset Password Gagal", {
        description:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat reset password. Silakan periksa kembali kredensial Anda dan coba lagi.",
      });
    },
  });

  const onSubmit = useCallback(
    (values: ResetPasswordFormType) => {
      mutate({ ...values, token });
    },
    [mutate, token],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Buat password baru anda"
                  aria-label="password"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konfirmasi Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Konfirmasi password"
                  aria-label="confirm-password"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <LoadingButton
          type="submit"
          className="!mt-10 w-full"
          disabled={isPending}
          loading={isPending}
        >
          Reset Password
        </LoadingButton>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
