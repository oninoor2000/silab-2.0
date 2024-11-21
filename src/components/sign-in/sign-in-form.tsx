"use client";
import Link from "next/link";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormSchema, type SignInFormType } from "~/zodSchema";

import { SignInAction } from "~/server/actions/sign-in-action";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "../ui/form";

import { toast } from "sonner";
import { Input } from "~/components/ui/input";
import { LoadingButton } from "../ui/loading-button";

const SignInForm: React.FC = () => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<SignInFormType>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormType) => {
    setSubmitLoading(true);
    try {
      const result = await SignInAction(data);

      if (!result?.success) {
        toast.error("Login gagal", {
          description: result.message,
        });
        form.reset();
      } else {
        toast.success("Login berhasil", {
          description: "Anda akan diarahkan ke halaman utama",
        });
        router.push("/");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setSubmitLoading(false);
    }
  };

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
                  placeholder="Masukkan email Anda"
                  type="email"
                  disabled={submitLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>

                <Link
                  className="text-sm font-medium text-muted-foreground"
                  href="/lupa-password"
                >
                  Lupa password?
                </Link>
              </div>
              <FormControl>
                <Input
                  placeholder="Masukkan password Anda"
                  type="password"
                  disabled={submitLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton type="submit" loading={submitLoading} className="w-full">
          Masuk
        </LoadingButton>
      </form>
    </Form>
  );
};

export default SignInForm;
