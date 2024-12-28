import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { generateVerificationToken } from "~/hooks/generate-verif-token";
import { SignUpFormSchema } from "~/zodSchema";
import { sendNewUserEmail } from "~/hooks/send-new-user-email";

export const signUpRouter = createTRPCRouter({
  createNewUser: publicProcedure
    .input(SignUpFormSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, email, password, mobilePhone } = input;

      // Check for existing user and hash password
      const [existingUser, hashedPassword] = await Promise.all([
        ctx.db.user.findUnique({
          where: { email },
        }),
        bcrypt.hash(password, 10),
      ]);

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email yang Anda masukkan sudah terdaftar.",
        });
      }

      // Create new user
      const user = await ctx.db.user.create({
        data: {
          name,
          email,
          phone: mobilePhone,
          password: hashedPassword,
          organization: "PUBLIC",
          image:
            "https://utfs.io/f/P2oQLWYULKY4aqFR2L1whGIk3mnvqc6iJeNurWHg1YdMoOB9",
          role: "USER",
        },
      });

      const getToken = await generateVerificationToken(user.id);

      if (!getToken?.verificationToken?.token || !getToken.success) {
        throw new TRPCError({
          code: "BAD_GATEWAY",
          message:
            "The server received an invalid response from the upstream server.",
        });
      }

      await sendNewUserEmail({
        to: email,
        token: getToken.verificationToken.token,
        userName: name,
      });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        message:
          "User berhasil dibuat. Silakan periksa email Anda untuk verifikasi.",
      };
    }),
});
