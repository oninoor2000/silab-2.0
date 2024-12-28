import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  forgotPasswordFormSchema,
  ResetPasswordFormSchemaWithToken,
} from "~/zodSchema/forgot-password-schema";
import { sendResetPasswordEmail } from "~/hooks/send-reset-password-email";

export const forgotPasswordRouter = createTRPCRouter({
  generateToken: publicProcedure
    .input(forgotPasswordFormSchema)
    .mutation(async ({ ctx, input }) => {
      const currentTime = new Date();
      const oneHourInMs = 3600 * 1000; // 1 hour in milliseconds
      const user = await ctx.db.user.findUnique({
        select: {
          id: true,
          name: true,
          email: true,
        },
        where: { email: input.email },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Periksa kembali email anda lalu coba lagi.",
        });
      }

      // Create a new verification token
      const token = uuidv4();
      const expires = new Date(currentTime.getTime() + oneHourInMs);

      // create a new request and delete the other active one
      await Promise.all([
        ctx.db.passwordResetRequest.create({
          data: {
            userId: user.id,
            token: token,
            expiresAt: expires,
          },
        }),
        ctx.db.passwordResetRequest.deleteMany({
          where: {
            userId: user.id,
            isUsed: false,
            expiresAt: { gte: currentTime },
            token: { not: token },
          },
        }),
        sendResetPasswordEmail({
          to: user.email,
          userName: user.name ?? "Pelanggan",
          resetPasswordToken: token,
        }),
      ]);

      return {
        name: user.name,
        email: user.email,
        message:
          "Silakan ikuti instruksi reset password yang kami kirim melalui email",
      };
    }),

  updatePassword: publicProcedure
    .input(ResetPasswordFormSchemaWithToken)
    .mutation(async ({ ctx, input }) => {
      const [resetRequest, hashedPassword] = await Promise.all([
        ctx.db.passwordResetRequest.findFirst({
          where: {
            token: input.token,
            isUsed: false,
            expiresAt: { gte: new Date() },
          },
        }),
        bcrypt.hash(input.password, 10),
      ]);

      if (!resetRequest) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Token kadaluarsa/tidak valid!",
        });
      }

      const [revokeToken, user] = await ctx.db.$transaction([
        ctx.db.passwordResetRequest.update({
          where: { id: resetRequest.id },
          data: { isUsed: true },
        }),
        ctx.db.user.update({
          where: { id: resetRequest.userId },
          data: { password: hashedPassword },
        }),
      ]);

      if (!revokeToken || !user) {
        throw new TRPCError({
          code: "BAD_GATEWAY",
          message:
            "The server received an invalid response from the upstream server.",
        });
      }

      return { success: true, message: "Update password berhasil" };
    }),
});
