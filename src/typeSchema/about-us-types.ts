import type { Prisma } from "@prisma/client";

export type labManagersCarouselProps = Prisma.UserGetPayload<{
  select: {
    job: true;
    name: true;
    image: true;
  };
}>;
