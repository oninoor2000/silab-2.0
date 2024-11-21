import bcrypt from "bcryptjs";
import { db } from "~/server/db";
import type { Role } from "@prisma/client";
import { SignInFormSchema } from "~/zodSchema";
import CredentialsProvider from "next-auth/providers/credentials";
import type { Session, DefaultSession, NextAuthConfig } from "next-auth";

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
        const validatedFields = SignInFormSchema.safeParse(credentials);

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
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.emailVerified = !!user.emailVerified;
        token.email = user.email;
        token.image = user.image;
        token.name = user.name;
      }

      // Hanya update token jika trigger adalah "update" dan session memiliki data yang valid
      if (
        trigger === "update" &&
        (session as Session)?.user?.emailVerified !== undefined
      ) {
        token.emailVerified = (session as Session).user.emailVerified;
      }

      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as Role,
          emailVerified: !!token.emailVerified,
          email: token.email,
          image: token.image as string | null,
          name: token.name,
        },
      };
    },
  },
  pages: {
    signIn: "/masuk",
    verifyRequest: "/verifikasi-akun",
  },
} satisfies NextAuthConfig;
