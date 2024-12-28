"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { SignInAction } from "~/server/actions/sign-in-action";
import { SignInFormSchema, type SignInFormType } from "~/zodSchema";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "../ui/form";
import { Input } from "~/components/ui/input";
import { LoadingButton } from "../ui/loading-button";
import { PasswordInput } from "../ui/custom/password-input";

const SignInForm: React.FC = () => {
  const router = useRouter();

  const form = useForm<SignInFormType>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: SignInFormType) => {
    try {
      const result = await SignInAction(data);

      if (!result?.success) {
        toast.error("Login Gagal", {
          description: result.message || "Email atau password salah.",
        });
        reset();
      } else {
        toast.success("Login Berhasil", {
          description: "Anda akan diarahkan ke halaman utama.",
        });
        router.push("/");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Field */}
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  placeholder="Masukkan email Anda"
                  type="email"
                  disabled={isSubmitting}
                  aria-label="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link
                  className="text-sm font-medium text-muted-foreground hover:underline"
                  href="/lupa-password"
                >
                  Lupa password?
                </Link>
              </div>
              <FormControl>
                <PasswordInput
                  placeholder="Masukkan password Anda"
                  aria-label="Password"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <LoadingButton
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
          className="w-full"
        >
          Masuk
        </LoadingButton>
      </form>
    </Form>
  );
};

export default SignInForm;
