import React from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { RectangleEllipsis } from "lucide-react";
import SignInForm from "~/components/sign-in/sign-in-form";

const SignIn = () => {
  return (
    <div className="relative flex h-full flex-col justify-center">
      <Card className="m-auto max-w-sm animate-fade rounded-md border-0 shadow-none animate-duration-1000 animate-ease-in-out md:border lg:border-0">
        <CardHeader>
          <div className="mb-5 flex h-11 w-11 items-center justify-center border border-zinc-200 dark:border-zinc-800">
            <RectangleEllipsis />
          </div>
          <CardTitle className="text-xl">Masuk</CardTitle>
          <CardDescription>
            Masuk untuk melakukan pemesanan laboratorium yang mudah dan cepat.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
          <div className="mt-4 text-center text-sm">
            Belum memiliki akun?{" "}
            <Link href="/daftar" className="underline">
              Daftar
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
