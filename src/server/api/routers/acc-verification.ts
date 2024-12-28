// routers/accVerificationRouter.ts

import { TRPCError } from "@trpc/server";
import { sendNewUserEmail } from "~/hooks/send-new-user-email";
import { generateVerificationToken } from "~/hooks/generate-verif-token";
import { accVerificationSchema } from "~/zodSchema/acc-verification-schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const accVerificationRouter = createTRPCRouter({
  /**
   * Mutation to verify a user's account using a token.
   */
  verifyAccount: publicProcedure
    .input(accVerificationSchema)
    .mutation(async ({ ctx, input }) => {
      const { token } = input;

      // Fetch the verification token with minimal fields
      const verificationToken = await ctx.db.verificationToken.findUnique({
        where: { token, expires: { gte: new Date() } },
        select: { id: true, userId: true, expires: true },
      });

      if (!verificationToken) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Token verifikasi kadaluarsa/tidak valid.",
        });
      }

      // Perform user update and token deletion atomically
      await ctx.db.$transaction([
        ctx.db.user.update({
          where: { id: verificationToken.userId },
          data: { emailVerified: new Date() },
        }),
        ctx.db.verificationToken.delete({
          where: { id: verificationToken.id },
        }),
      ]);

      return { message: "Email berhasil diverifikasi." };
    }),

  /**
   * Mutation to resend the verification email to the user.
   */
  resendVerificationEmail: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    // Fecth the user and check for existing token
    const [user, getToken] = await Promise.all([
      ctx.db.user.findUnique({
        where: { id: userId, emailVerified: null },
        select: { id: true, email: true, name: true, emailVerified: true },
      }),
      generateVerificationToken(userId),
    ]);

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User tidak ditemukan.",
      });
    }

    if (getToken.success === false) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: `Silakan tunggu ${getToken.waitTime} detik sebelum mengirim ulang email verifikasi.`,
      });
    }

    // Send the verification email after successfully creating the token
    await sendNewUserEmail({
      to: user.email,
      token: getToken?.verificationToken?.token ?? "",
      userName: user.name ?? "Pelanggan",
    });

    return { message: "Email verifikasi berhasil dikirim ulang." };
  }),
});
