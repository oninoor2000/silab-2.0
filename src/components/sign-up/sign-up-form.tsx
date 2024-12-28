"use client";
import { useCallback } from "react";

import { toast } from "sonner";
import { api } from "~/trpc/react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { PasswordInput } from "../ui/custom/password-input";
import { PhoneInput } from "../ui/custom/phone-input";
import { SignUpFormSchema, type SignUpFormType } from "~/zodSchema";
import { LoadingButton } from "../ui/loading-button";

export default function SignUpForm() {
  const router = useRouter();

  const form = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      mobilePhone: "",
      name: "",
      password: "",
    },
  });
  const { reset, control, getValues, handleSubmit } = form;

  const { mutate, isPending } = api.signUp.createNewUser.useMutation({
    onSuccess: async () => {
      const { email, password } = getValues();
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        toast.error("Pendaftaran berhasil, tetapi login otomatis gagal.", {
          description: "Silakan coba login secara manual.",
        });
        router.push("/sign-in");
      } else {
        toast.success("Pendaftaran Berhasil", {
          description:
            "Anda telah berhasil masuk. Silakan cek email Anda untuk melakukan verifikasi.",
        });
        router.push("/dashboard");
      }
    },
    onError: (error) => {
      toast.error("Pendaftaran Gagal", {
        description:
          error.message ||
          "Terjadi kesalahan saat pendaftaran. Silakan periksa kembali kredensial Anda dan coba lagi.",
      });
      reset();
    },
  });

  const onSubmit = useCallback(
    (values: SignUpFormType) => {
      mutate(values);
    },
    [mutate],
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@mail.com"
                    type="email"
                    aria-label="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="mobilePhone"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>No Telp</FormLabel>
                <FormControl>
                  <PhoneInput
                    placeholder="0812 9999 9999"
                    defaultCountry="ID"
                    aria-label="No Telp"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ali Chamid"
                  type="text"
                  aria-label="Nama"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Password"
                  aria-label="Password"
                  {...field}
                />
              </FormControl>
              <FormDescription>Minimal 8 karakter</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          type="submit"
          className="w-full"
          loading={isPending}
          disabled={isPending}
        >
          Daftar
        </LoadingButton>
      </form>
    </Form>
  );
}
