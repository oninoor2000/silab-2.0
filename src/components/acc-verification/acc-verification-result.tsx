"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";

import { toast } from "sonner";
import { ButtonLink } from "../ui/button-link";
import { ShieldCheck, ShieldX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import ResendVerificationEmail from "./acc-resend-verification";

const AccVerificationResult = ({ token }: { token: string }) => {
  const router = useRouter();
  const [attempt, setAttempt] = React.useState<number>(0);
  const { data: session, update: updateSession } = useSession();

  const verifyAccountMutation = api.accVerification.verifyAccount.useMutation({
    onSuccess: async () => {
      toast.success("Email berhasil diverifikasi!");

      // Trigger update session
      await updateSession({
        user: { ...session?.user, emailVerified: true },
      });

      router.push("/");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat verifikasi akun.",
      );
    },
  });

  useEffect(() => {
    if (attempt > 0) return;

    verifyAccountMutation.mutate({ token });
    setAttempt(attempt + 1);
  }, [attempt, token, verifyAccountMutation]);

  const { isPending, isError, error, isSuccess } = verifyAccountMutation;

  if (isPending) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3">
        <div className="flex flex-row gap-2">
          <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-900 dark:bg-zinc-200"></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-900 [animation-delay:-.3s] dark:bg-zinc-200"></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-900 [animation-delay:-.5s] dark:bg-zinc-200"></div>
        </div>
        <p className="text-muted-foreground">Memuat...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="m-auto max-w-sm">
        <CardHeader>
          <div className="mb-5 flex h-11 w-11 items-center justify-center border border-zinc-200 dark:border-zinc-800">
            <ShieldX aria-hidden="true" />
          </div>
          <CardTitle className="font-mono text-xl font-semibold">
            Verifikasi Gagal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {error?.message ||
              "Terjadi kesalahan saat memverifikasi email Anda."}
          </p>
          <ResendVerificationEmail />
        </CardContent>
      </Card>
    );
  }

  if (!isPending && !isError && isSuccess) {
    return (
      <Card className="m-auto max-w-sm animate-fade rounded-md border-0 shadow-none animate-duration-1000 animate-ease-in-out md:border lg:border-0">
        <CardHeader>
          <div className="mb-5 flex h-11 w-11 items-center justify-center border border-zinc-200 dark:border-zinc-800">
            <ShieldCheck />
          </div>
          <CardTitle className="font-mono text-xl font-semibold">
            Verifikasi Berhasil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Akun anda berhasil diverifikasi, semua fitur sudah bisa digunakan.
          </p>
          <ButtonLink href="/" className="mt-5">
            Ke Halaman Utama
          </ButtonLink>
        </CardContent>
      </Card>
    );
  }
};

export default AccVerificationResult;
