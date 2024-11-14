import type { Prisma } from "@prisma/client";

export type researchStaticSlugType = Prisma.ResearchPortfolioGetPayload<{
  select: {
    slug: true;
  };
}>;
