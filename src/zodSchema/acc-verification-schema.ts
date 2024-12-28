import { z } from "zod";

export const accVerificationSchema = z.object({
  token: z.string().nonempty(),
});

export type accVerificationSchemaType = z.infer<typeof accVerificationSchema>;
