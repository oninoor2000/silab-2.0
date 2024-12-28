import React from "react";
import { redirect } from "next/navigation";

import type { Metadata } from "next";
import type { SearchParams } from "~/typeSchema/global-types";

import { auth } from "~/server/auth";

import AccVerificationCard from "~/components/acc-verification/acc-verification-card";
import AccVerificationResult from "~/components/acc-verification/acc-verification-result";

export const metadata: Metadata = {
  title: "Verifikasi Akun",
  description:
    "Lakukan verifikasi akun untuk melakukan pemesanan laboratorium yang mudah dan cepat.",
};

const AccountVerification = async (props: { searchParams: SearchParams }) => {
  // Get the token from the URL search params and user session
  const [searchParams, session] = await Promise.all([
    props.searchParams,
    auth(),
  ]);

  if (!session?.user) {
    return redirect("/masuk");
  }

  return (
    <div className="relative flex h-full flex-col justify-center">
      {searchParams.token ? (
        <AccVerificationResult token={searchParams.token as string} />
      ) : (
        <AccVerificationCard user={session.user} />
      )}
    </div>
  );
};

export default AccountVerification;
