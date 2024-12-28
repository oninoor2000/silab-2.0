"use client";

import React, { useEffect, useState } from "react";

import { api } from "~/trpc/react";

import { toast } from "sonner";
import { Button } from "../ui/button";

const ResendVerificationEmail = ({ cooldown = 60 }: { cooldown?: number }) => {
  const [timeLeft, setTimeLeft] = useState<number>(cooldown);
  const [canResend, setCanResend] = useState<boolean>(false);

  const resendVerificationAction =
    api.accVerification.resendVerificationEmail.useMutation({
      onMutate: () => {
        toast.loading("Mengirim email verifikasi...", {
          id: "resendVerificationEmail",
        });
      },
      onSuccess: () => {
        toast.dismiss("resendVerificationEmail");
        toast.success("Email verifikasi berhasil dikirim ulang.");
        setTimeLeft(cooldown);
        setCanResend(false);
      },
      onError: (error) => {
        toast.dismiss("resendVerificationEmail");
        toast.error(error.message || "Gagal mengirim ulang email verifikasi.");
      },
    });

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleResend = async () => {
    if (!canResend) return;

    try {
      await resendVerificationAction.mutateAsync();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Gagal mengirim ulang email verifikasi.",
      );
    }
  };

  return (
    <div className="mt-4 text-sm">
      Belum menerima email?{" "}
      <Button
        variant="link"
        className="px-0 underline"
        disabled={!canResend || resendVerificationAction.isPending}
        onClick={handleResend}
      >
        Kirim Ulang
      </Button>
      {!canResend && (
        <span className="text-sm text-muted-foreground">
          {" "}
          ({timeLeft} detik)
        </span>
      )}
    </div>
  );
};

export default ResendVerificationEmail;
