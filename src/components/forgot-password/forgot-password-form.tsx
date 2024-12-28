"use client";
import React, { useCallback } from "react";

import { toast } from "sonner";
import { api } from "~/trpc/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordFormSchema,
  type ForgotPasswordFormType,
} from "~/zodSchema/forgot-password-schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { LoadingButton } from "../ui/loading-button";

const ForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = api.forgotPassword.generateToken.useMutation({
    onSuccess: (data) => {
      form.reset();
      toast.success("Email terkirim", {
        description:
          data.message ??
          "Reset password berhasil, periksa email anda untuk melihat instruksi.",
      });
    },
    onError(error) {
      form.reset();
      toast.error("Reset Password Gagal", {
        description:
          error.message ??
          "Terjadi kesalahan saat reset password. Silakan periksa kembali kredensial Anda dan coba lagi.",
      });
    },
  });

  const onSubmit = useCallback(
    (values: ForgotPasswordFormType) => {
      mutate(values);
    },
    [mutate],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan email anda"
                  type="email"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          type="submit"
          className="!mt-10 w-full"
          loading={isPending}
          disabled={isPending}
        >
          Reset Password
        </LoadingButton>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
