import type { Prisma } from "@prisma/client";

export type articleCarouselProps = Prisma.ArticleGetPayload<{
  select: {
    id: true;
    slug: true;
    title: true;
    summary: true;
    user: {
      select: {
        name: true;
      };
    };
    publishedDate: true;
    categories: {
      select: {
        category: {
          select: {
            name: true;
          };
        };
      };
    };
    coverImg: true;
  };
}>;
