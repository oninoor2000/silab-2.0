"use client";

import React from "react";
import Image from "next/image";

import type { User } from "next-auth";
import type { Role } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ButtonLink } from "../ui/button-link";

import ResendVerificationEmail from "./acc-resend-verification";

const AccVerificationCard = ({
  user,
}: {
  user: { id: string; role: Role; emailVerified: boolean } & User;
}) => {
  if (user.emailVerified) {
    return (
      <Card className="m-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">
            Akun Anda Sudah Terverifikasi
          </CardTitle>
          <CardDescription>
            Terima kasih telah memverifikasi akun Anda. Anda dapat mulai
            menggunakan semua fitur.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ButtonLink href="/" size="lg">
            Kembali ke Beranda
          </ButtonLink>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="m-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Mohon Verifikasi Akun Anda</CardTitle>
        <CardDescription>
          Kami telah mengirim tautan verifikasi ke email{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">
            {user.email}
          </strong>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src="/assets/images/static/verif-img-light.png"
          width={456}
          height={398.5}
          alt="Verifikasi Akun"
          className="dark:hidden"
        />
        <Image
          src="/assets/images/static/verif-img-dark.png"
          width={456}
          height={398.5}
          alt="Verifikasi Akun"
          className="hidden dark:block"
        />
        <ResendVerificationEmail />
      </CardContent>
    </Card>
  );
};

export default AccVerificationCard;
