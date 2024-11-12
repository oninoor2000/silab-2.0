import type { Prisma } from "@prisma/client";

export type articleStaticSlugType = Prisma.ArticleGetPayload<{
  select: {
    slug: true;
  };
}>;
