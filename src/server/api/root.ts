import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { testRouter } from "./routers/test";
import { signUpRouter } from "./routers/sign-up";
import { accVerificationRouter } from "./routers/acc-verification";
import { forgotPasswordRouter } from "./routers/forgot-password";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  test: testRouter,
  signUp: signUpRouter,
  forgotPassword: forgotPasswordRouter,
  accVerification: accVerificationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
