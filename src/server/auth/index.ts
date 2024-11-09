import NextAuth from "next-auth";
import { cache } from "react";

import { authConfig } from "./config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "../db";
import { Adapter } from "next-auth/adapters";

const {
  auth: uncachedAuth,
  handlers,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  session: { strategy: "jwt" },
  ...authConfig,
});

const auth = cache(uncachedAuth);

export { auth, handlers, signIn, signOut };
