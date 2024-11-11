import React from "react";
import Link from "next/link";
import Image from "next/image";
import { db } from "~/server/db";
import { notFound } from "next/navigation";

import type {
  laboratoryReviewType,
  laboratoryStaticSlugType,
  RatingCounts,
  RatingPercentages,
  ReviewStatistics,
} from "~/typeSchema/laboratory-detail-types";
import type { Params, SearchParams } from "~/typeSchema/global";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  getOperationalEndTime,
  getOperationalStartTime,
} from "~/hooks/get-operational-day";

import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { getNameInitials } from "~/hooks/get-initial-name";
import { ChevronLeft, CircleCheck, Share2, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import ShareDropdown from "~/components/root/share-dropdown";
import LabDetailGallery from "~/components/lab-detail/gallery";
import LabDetailServiceCarousel from "~/components/lab-detail/service";
import FacilityDialogTrigger from "~/components/lab-detail/facility-dialog";

const calculateReviewStatistics = (
  reviews: laboratoryReviewType[],
): ReviewStatistics => {
  const totalReviews = reviews.length;

  const defaultStats: ReviewStatistics = {
    averageRating: 0,
    totalReviews: 0,
    percentages: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    ratingCount: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  };

  if (totalReviews === 0) {
    return defaultStats;
  }

  const initialRatingCount: RatingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  const ratingCount = reviews.reduce((acc: RatingCounts, review) => {
    const rating = review.rating as keyof RatingCounts;
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, initialRatingCount);

  const sumRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = parseFloat((sumRatings / totalReviews).toFixed(1));

  const percentages = Object.entries(ratingCount).reduce(
    (acc, [rating, count]) => {
      const ratingKey = Number(rating) as keyof RatingPercentages;
      acc[ratingKey] = (count / totalReviews) * 100;
      return acc;
    },
    { ...defaultStats.percentages },
  );

  return {
    averageRating,
    totalReviews,
    percentages,
    ratingCount,
  };
};

export const revalidate = 60;

export const dynamicParams = true;

export async function generateStaticParams() {
  const labSlugs: laboratoryStaticSlugType[] = await db.laboratory.findMany({
    select: {
      slug: true,
    },
  });

  return labSlugs.map((lab) => ({
    slug: String(lab.slug),
  }));
}

export async function generateMetadata(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const lab = await db.laboratory.findUnique({
    where: { slug: params.slug },
    select: {
      name: true,
      coverImg: true,
    },
  });

  return {
    title: lab?.name,
    openGraph: {
      images: [lab?.coverImg],
    },
  };
}

const LaboratoryDetail = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const params = await props.params;

  const laboratoryData = await db.laboratory.findUnique({
    where: { slug: params.slug },
    include: {
      facilities: true,
      services: true,
      images: true,
      managers: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              job: true,
              image: true,
            },
          },
        },
      },
      researchPortfolios: {
        take: 2,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          abstract: true,
          slug: true,
          coverImg: true,
        },
      },
      reviews: {
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      operationalHours: true,
    },
  });

  if (!laboratoryData) {
    return notFound();
  }

  const laboratory = {
    ...laboratoryData,
    area: Number(laboratoryData.area),
    services: laboratoryData.services.map((service) => ({
      ...service,
      price: Number(service.price),
    })),
  };
  const ratingPercentage = calculateReviewStatistics(laboratory.reviews);
  const ratings = [5, 4, 3, 2, 1] as const;

  return (
    <>
      {/* Header */}
      <section className="mt-10 grid grid-cols-1 content-center gap-5 px-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-2 lg:px-20">
        <div className="flex w-full items-center justify-between md:justify-start">
          <Button asChild variant="ghost" className="px-0 hover:bg-transparent">
            <Link href="/laboratorium" className="flex gap-2">
              <ChevronLeft className="h-4 w-4" />
              Kembali
            </Link>
          </Button>

          <ShareDropdown text={laboratory.name} />
        </div>

        <div className="flex w-full items-center justify-center md:justify-end">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/laboratorium">
                  Laboratorium
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Lab Detail</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Title */}
      <section className="my-10 flex items-center justify-between gap-20 px-5 lg:px-20">
        <div className="w-full lg:w-5/6">
          <h1 className="text-center text-2xl md:text-left md:text-3xl lg:text-5xl">
            {laboratory?.name}
          </h1>
          <h2 className="mt-5 text-center text-muted-foreground md:text-left lg:text-lg">
            Jurusan Kesehatan Politeknik Negeri Jember
          </h2>
        </div>

        <ShareDropdown className="hidden md:!flex" text={laboratory.name} />
      </section>

      {/* Gallery */}
      <section className="px-5 lg:px-20">
        {/* <LabDetailGallery images={laboratory?.images ?? []} /> */}
        <LabDetailGallery images={laboratory?.images} />
      </section>

      {/* Main Section */}
      <section className="mt-20 px-5 lg:px-20">
        <div className="flex flex-col-reverse gap-10 md:grid md:grid-cols-6">
          {/* Main Col */}
          <div className="w-full md:col-span-3 lg:col-span-4">
            {/* Laboratory Description */}
            <div>
              <h3 className="text-3xl font-semibold">Deskripsi</h3>
              <p className="mt-5 line-clamp-5 text-muted-foreground">
                {laboratory?.description}
              </p>
            </div>

            <Separator className="my-14" />

            {/* Laboratory Facilities */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-semibold">Fasilitas</h3>
                {laboratory?.facilities && laboratory.facilities.length > 0 && (
                  <FacilityDialogTrigger facilities={laboratory?.facilities} />
                )}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-3">
                {laboratory?.facilities.length === 0 && (
                  <p>Tidak ada data fasilitas tersedia</p>
                )}

                {laboratory?.facilities.map((facility) => (
                  <div
                    key={facility.id}
                    className="flex items-center justify-start gap-4"
                  >
                    <CircleCheck className="h-5 w-5" />
                    <span className="text-muted-foreground">
                      {facility.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-14" />

            {/* Laboratory services */}
            <LabDetailServiceCarousel services={laboratory?.services} />

            <Separator className="my-14" />

            {/* Laboratory Floorplan */}
            <h3 className="text-3xl font-semibold">Denah</h3>
            <div>
              {laboratory?.floorPlanUrl ? (
                <Image
                  src={laboratory?.floorPlanUrl}
                  width={888}
                  height={888}
                  alt={`${laboratory?.name} floorplan`}
                  className="mt-5"
                />
              ) : (
                <p>Denah tidak tersedia</p>
              )}
            </div>
          </div>
          {/* End Main Col */}

          {/* Aside */}
          <aside className="w-full md:col-span-3 lg:col-span-2">
            {/* Booking Card */}
            {/* <ReservationForm
              operationalHours={undefined}
              services={services ?? undefined}
              laboratoryId={id}
            /> */}

            {/* Laboratory Detail */}
            <Card className="mt-10 rounded-md shadow-none">
              <CardHeader>
                <CardTitle>Detail Laboratorium</CardTitle>
                <CardDescription>{laboratory?.address}</CardDescription>
              </CardHeader>
              <Separator className="mx-6 mb-4 w-auto" />
              <CardContent className="overflow-auto">
                <div className="flex flex-col flex-wrap items-start gap-4 lg:flex-row lg:items-center">
                  <span className="mr-auto text-base text-muted-foreground md:text-sm">
                    Luas lab
                  </span>
                  <span className="text-wrap text-base font-medium md:text-sm">
                    {`${laboratory?.area?.toString() ?? 0} m/2`}
                  </span>
                </div>

                <div className="mt-4 flex flex-col flex-wrap items-start gap-4 lg:flex-row lg:items-center">
                  <span className="mr-auto text-base text-muted-foreground md:text-sm">
                    Operasional
                  </span>
                  <span className="text-wrap text-base font-medium md:text-sm">
                    {`${getOperationalStartTime(laboratory?.operationalHours ?? [])} - ${getOperationalEndTime(laboratory?.operationalHours ?? [])}`}
                  </span>
                </div>

                <div className="mt-4 flex flex-col flex-wrap items-start gap-4 lg:flex-row lg:items-center">
                  <span className="mr-auto text-base text-muted-foreground md:text-sm">
                    Kapasitas
                  </span>
                  <span className="text-wrap text-base font-medium md:text-sm">
                    {laboratory?.capacity}
                  </span>
                </div>

                <div className="mt-4 flex flex-col flex-wrap items-start gap-4 lg:flex-row lg:items-center">
                  <span className="mr-auto text-base text-muted-foreground md:text-sm">
                    Narahubung
                  </span>
                  <span className="text-wrap text-base font-medium md:text-sm">
                    {laboratory?.contactName}
                  </span>
                </div>

                <div className="mt-4 flex flex-col flex-wrap items-start gap-4 lg:flex-row lg:items-center">
                  <span className="mr-auto text-base text-muted-foreground md:text-sm">
                    Email
                  </span>
                  <span className="text-wrap text-base font-medium md:text-sm">
                    {laboratory?.contactEmail}
                  </span>
                </div>

                <div className="mt-4 flex flex-col flex-wrap items-start gap-4 lg:flex-row lg:items-center">
                  <span className="mr-auto text-base text-muted-foreground md:text-sm">
                    Kontak
                  </span>
                  <span className="text-wrap text-base font-medium md:text-sm">
                    {laboratory?.contactPhone}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Laboratory Manager */}
            <Card className="mt-10 rounded-md shadow-none">
              <CardHeader>
                <CardTitle>Pengelola Laboratorium</CardTitle>
                <CardDescription>
                  {`Pengelola ${laboratory?.name}`}
                </CardDescription>
              </CardHeader>
              <Separator className="mx-6 mb-4 w-auto" />
              <CardContent>
                {laboratory?.managers.length === 0 && (
                  <p>Tidak ada data pengelola tersedia</p>
                )}

                {laboratory?.managers.map((manager, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-start gap-3"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        className="h-12 w-12"
                        src={manager.user.image ?? ""}
                        alt={manager.user.name ?? "Manager picture"}
                      />
                      <AvatarFallback className="h-12 w-12">
                        {getNameInitials(manager.user.name!)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-medium">{manager.user.name}</p>
                      <span className="text-sm text-muted-foreground">
                        {manager.user.job}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
          {/* End Aside */}
        </div>
      </section>

      {/* Portfolio Seciton */}
      <section className="mt-20 px-5 lg:px-20">
        <h3 className="text-3xl font-semibold">Portofolio Penelitian</h3>
        <div className="mt-5 flex flex-col items-center justify-between gap-5 md:flex-row lg:gap-10">
          {laboratory?.researchPortfolios.length === 0 ? (
            <p>Belum ada data portofolio penelitian tersedia</p>
          ) : (
            <>
              {/* Research Cards */}
              {laboratory?.researchPortfolios.map((research) => (
                <Link
                  key={research.id}
                  href={`/penelitian/${research.slug}`}
                  className="w-full md:w-1/2"
                >
                  <Card className="flex h-full w-full flex-col justify-center rounded-md !p-5 shadow-transparent transition-shadow duration-500 hover:shadow-md">
                    <CardContent className="p-0">
                      <div className="flex items-center justify-between gap-4">
                        <div className="relative hidden md:block md:h-40 md:min-w-24 lg:h-48 lg:min-w-48">
                          <Image
                            src={research.coverImg}
                            alt={`${research.title} image`}
                            fill={true}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover md:h-40 md:w-24 lg:h-48 lg:w-48"
                          />
                        </div>

                        <div>
                          <p className="line-clamp-2 text-lg font-semibold">
                            {research.title}
                          </p>
                          <p className="mb-3 mt-3 line-clamp-2 text-muted-foreground lg:mb-4 lg:mt-4">
                            {research.abstract}
                          </p>
                          <span className="font-medium hover:underline">
                            Baca sekarang
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </>
          )}
        </div>
      </section>
      {/* End Portfolio Seciton */}

      {/* Testimonial Seciton */}
      <section className="mb-32 mt-20 px-5 lg:px-20">
        {/* Title */}
        <div className="lg:w-4/6">
          <h3 className="text-3xl font-semibold">Ulasan dan Penilaian</h3>
          <p className="mt-2 text-muted-foreground">
            Dapatkan gambaran singkat mengenai kepuasan keseluruhan dari para
            client kami
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-6">
          {/* Review Statistics */}
          <div className="md:col-span-2">
            <span className="text-4xl font-medium">
              {ratingPercentage.averageRating}
            </span>
            {/* <RenderStarRating
              rating={ratingPercentage.averageRating}
              classname="mt-2 mb-2"
            /> */}
            <span className="mt-2 text-sm text-muted-foreground">{`${ratingPercentage.totalReviews} penilaian`}</span>

            {/* Rating Statistic */}
            <div className="mt-5 lg:mt-10">
              {ratings.map((rating) => (
                <div key={rating} className="mt-1 flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-500 stroke-yellow-500" />
                  <div className="flex min-w-3 justify-center">
                    <span>{rating}</span>
                  </div>
                  {/* <Progress
                    value={ratingPercentage.percentages[rating]}
                    className="w-full"
                  /> */}
                  <div className="w-5">
                    <span className="text-sm text-muted-foreground">{`(${ratingPercentage.ratingCount[rating]})`}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review Cards */}
          <div className="md:col-span-4">
            {laboratory?.reviews.length === 0 && (
              <div className="flex h-full items-center">
                <p className="mx-auto">Belum ada penilaian yang diberikan</p>
              </div>
            )}

            {laboratory?.reviews.map((review) => (
              <Card
                key={review.id}
                className="mt-5 rounded-md p-5 shadow-transparent transition-shadow duration-500 hover:shadow-md"
              >
                <CardContent className="p-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <span>
                        {review.isAnonymous ? "Anonim" : review.user.name}
                      </span>
                      {/* <RenderStarRating
                        rating={review.rating}
                        classname="mt-3"
                      /> */}
                    </div>

                    <span className="text-muted-foreground">
                      {new Date(review.reviewDate).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <p className="mt-5 text-lg font-medium">{review.title}</p>
                  <p className="mt-2 text-muted-foreground">
                    {review.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonial Seciton */}
    </>
  );
};

export default LaboratoryDetail;
