import React from "react";
import Link from "next/link";

import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { BadgePlus } from "lucide-react";
import SignUpForm from "~/components/sign-up/sign-up-form";

export const metadata: Metadata = {
  title: "Daftar",
  description:
    "Daftar untuk melakukan pemesanan laboratorium yang mudah dan cepat.",
};

const SignUp = () => {
  return (
    <div className="relative flex h-full flex-col justify-center">
      <Card className="m-auto max-w-lg animate-fade rounded-md border-0 shadow-none animate-duration-1000 animate-ease-in-out md:border lg:border-0">
        <CardHeader>
          <div className="mb-5 flex h-11 w-11 items-center justify-center border border-zinc-200 dark:border-zinc-800">
            <BadgePlus />
          </div>
          <CardTitle className="text-xl">Daftar</CardTitle>
          <CardDescription>
            Daftar untuk melakukan pemesanan laboratorium yang mudah dan cepat.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />

          <div className="mt-4 text-center text-sm">
            Sudah memiliki akun?{" "}
            <Link href="/masuk" className="underline">
              Masuk
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
