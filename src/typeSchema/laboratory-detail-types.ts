import type { LaboratoryImage, Prisma, Service } from "@prisma/client";

export type laboratoryStaticSlugType = Prisma.LaboratoryGetPayload<{
  select: {
    slug: true;
  };
}>;

export type laboratoryDetailType = Prisma.LaboratoryGetPayload<{
  include: {
    facilities: true;
    services: true;
    images: true;
    managers: {
      include: {
        user: {
          select: {
            id: true;
            name: true;
            email: true;
            job: true;
            image: true;
          };
        };
      };
    };
    researchPortfolios: {
      take: 2;
      orderBy: { createdAt: "desc" };
      select: {
        id: true;
        title: true;
        abstract: true;
        slug: true;
        coverImg: true;
      };
    };
    reviews: {
      take: 5;
      orderBy: { createdAt: "desc" };
      include: {
        user: {
          select: {
            name: true;
          };
        };
      };
    };
    operationalHours: true;
  };
}>;

export type laboratoryReviewType = {
  id: number;
  userId: string;
  laboratoryId: number;
  reservationId: string;
  rating: number;
  title: string;
  description: string;
  reviewDate: Date;
  isAnonymous: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface RatingCounts {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface RatingPercentages {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface ReviewStatistics {
  averageRating: number;
  totalReviews: number;
  percentages: RatingPercentages;
  ratingCount: RatingCounts;
}

export interface LabDetailGalleryProps {
  images: LaboratoryImage[];
}

export interface LabDetailFacilityProps {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  laboratoryId: number;
}

export interface ServiceWithNumberPrice extends Omit<Service, "price"> {
  price: number;
}

export interface LabDetailServiceCarouselProps {
  services: ServiceWithNumberPrice[];
}
