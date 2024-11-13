import type { Prisma } from "@prisma/client";

export type researchCarouselProps = Prisma.ResearchPortfolioGetPayload<{
  select: {
    id: true;
    slug: true;
    title: true;
    abstract: true;
    type: true;
    authors: {
      select: {
        userId: true;
        role: true;
        orderNumber: true;
        user: {
          select: {
            name: true;
          };
        };
      };
    };
    publishedDate: true;
    coverImg: true;
  };
}>;
