import bcrypt from "bcryptjs";
import { db } from "~/server/db";
import type { Role } from "@prisma/client";
import { loginFormSchema } from "~/zodSchema";
import CredentialsProvider from "next-auth/providers/credentials";
import { type DefaultSession, type NextAuthConfig } from "next-auth";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
      emailVerified: boolean;
      // ...other properties
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
    emailVerified: boolean;
    // ...other properties
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */

    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = loginFormSchema.safeParse(credentials);

        if (!validatedFields.success) {
          throw new Error("Periksa kembali kredensial anda lalu coba lagi.");
        }

        const { email, password } = validatedFields.data;

        const user = await db.user.findFirst({
          where: {
            AND: [{ email }, { isDeleted: false }],
          },
        });

        if (!user) {
          throw new Error("Akun tidak ditemukan atau telah dihapus.");
        }

        if (!user?.password) {
          throw new Error("Periksa kembali kredensial anda lalu coba lagi.");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          throw new Error("Periksa kembali kredensial anda lalu coba lagi.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
          emailVerified: !!user.emailVerified,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: user.role,
        emailVerified: !!user.emailVerified,
        email: user.email,
        image: user.image,
        name: user.name,
      },
    }),
  },
} satisfies NextAuthConfig;
