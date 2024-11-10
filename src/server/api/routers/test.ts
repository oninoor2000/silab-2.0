import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const testRouter = createTRPCRouter({
  getUser: protectedProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
      }),
    )
    .query(async ({ input }) => {
      return {
        id: input.id,
        name: "John Doe",
      };
    }),
});
