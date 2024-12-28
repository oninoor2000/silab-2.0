import React from "react";
import Link from "next/link";

import type { Metadata } from "next";
import type { Params, SearchParams } from "~/typeSchema/global-types";

import { db } from "~/server/db";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { CircleX, Fingerprint } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

import ResetPasswordForm from "~/components/forgot-password/reset-password-form";
import ForgotPasswordForm from "~/components/forgot-password/forgot-password-form";

export const metadata: Metadata = {
  title: "Lupa Password",
  description:
    "Lupa password? Tidak masalah, kami akan mengirimkan instruksi untuk mengatur ulang password Anda.",
};

const ForgetPassword = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const searchParams = await props.searchParams;
  const currentTime = new Date();

  if (!searchParams.token) {
    return <ForgotPasswordCard />;
  }

  const resetRequest = await db.passwordResetRequest.findFirst({
    where: {
      token: searchParams.token as string,
      isUsed: false,
      expiresAt: { gte: currentTime },
    },
  });

  if (searchParams.token && !resetRequest) {
    return <ForgotPasswordCard failState={true} />;
  }

  return <ResetPasswordCard token={searchParams.token as string} />;
};

export default ForgetPassword;

// Component for rendering the forgot password card
const ForgotPasswordCard: React.FC<{ failState?: boolean }> = ({
  failState = false,
}) => {
  return (
    <div className="relative flex h-full flex-col justify-center">
      <Card className="m-auto max-w-sm animate-fade rounded-md border-0 shadow-none animate-duration-1000 animate-ease-in-out md:border lg:border-0">
        <CardHeader>
          <div className="mb-5 flex h-11 w-11 items-center justify-center border border-zinc-200 dark:border-zinc-800">
            <Fingerprint />
          </div>
          {failState && (
            <Alert variant="destructive">
              <CircleX className="h-4 w-4" />
              <AlertTitle>Token kadaluarsa/tidak valid!</AlertTitle>
              <AlertDescription>
                Anda dapat melakukan permintaan reset password kembali melalui
                form ini.
              </AlertDescription>
            </Alert>
          )}
          <CardTitle className={cn("text-xl", failState && "!mt-5")}>
            Lupa password?
          </CardTitle>
          <CardDescription>
            Kami akan mengirimkan instruksi pengaturan ulang password ke email
            Anda!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
          <div className="mt-4 text-center text-sm">
            Sudah ingat password Anda?{" "}
            <Link href="/masuk" className="underline">
              Masuk
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Component for rendering the reset password card
const ResetPasswordCard: React.FC<{ token: string }> = ({ token }) => {
  return (
    <div className="relative flex h-full flex-col justify-center">
      <Card className="m-auto max-w-sm animate-fade rounded-md border-0 shadow-none animate-duration-1000 animate-ease-in-out md:border lg:border-0">
        <CardHeader>
          <div className="mb-5 flex h-11 w-11 items-center justify-center border border-zinc-200">
            <Fingerprint />
          </div>
          <CardTitle className="text-xl">Atur Password</CardTitle>
          <CardDescription>
            Buat password baru Anda, password minimal terdiri dari 8 karakter!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm token={token} />
          <div className="mt-4 text-center text-sm">
            Sudah ingat password Anda?{" "}
            <Link href="/masuk" className="underline">
              Masuk
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
