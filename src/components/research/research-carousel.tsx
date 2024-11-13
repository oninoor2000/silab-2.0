"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";

import type { researchCarouselProps } from "~/typeSchema/research-page-types";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import type { Swiper as SwiperType } from "swiper";

import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "~/components/ui/badge";
import { getResearchType } from "~/hooks/get-research-type";

const ResearchCarousel = ({
  researchHeadlines,
}: {
  researchHeadlines: researchCarouselProps[];
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // Refs for accessing Swiper instances
  const swiperRef = useRef<SwiperType | null>(null);
  const handleNav = useCallback((index: number) => {
    swiperRef.current?.slideTo(index);
  }, []);

  const researchLength = researchHeadlines?.length;

  if (!researchHeadlines || researchHeadlines.length === 0) {
    return (
      <div className="col-span-full flex items-center justify-center">
        <div>Headline berita tidak ditemukan</div>
      </div>
    );
  }

  return (
    <section className="h-[70vh] w-full md:h-[80vh]">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
        }}
        modules={[Autoplay]}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
        className="h-full w-full"
      >
        {researchHeadlines?.map((research, index) => (
          <SwiperSlide key={index} className="relative h-full w-full">
            <Image
              src={research.coverImg}
              alt={`${research.title} Image`}
              fill
              className="-z-10 object-cover brightness-75"
              priority
            />

            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-30"></div>

            <div className="flex h-full flex-col items-start justify-end gap-5 p-10 md:p-20">
              <div className="bgem flex w-full flex-col items-start justify-center gap-10 md:justify-start lg:h-full lg:flex-row lg:items-end lg:justify-between lg:gap-20">
                <div className="w-full lg:w-1/2">
                  <Badge
                    variant={"secondary"}
                    className="capitalize dark:bg-zinc-300 dark:text-zinc-900"
                  >
                    {getResearchType(research.type)}
                  </Badge>

                  <h2 className="mt-5 line-clamp-2 stroke-zinc-900 stroke-2 text-xl font-medium text-zinc-50 dark:text-zinc-200 md:text-2xl lg:text-3xl">
                    {research.title}
                  </h2>
                  <p className="mt-5 line-clamp-2 text-zinc-200">
                    {research.abstract}
                  </p>
                  <Button
                    asChild
                    variant={"secondary"}
                    className="mt-10 w-min dark:bg-zinc-300 dark:text-zinc-900"
                  >
                    <Link href={`/penelitian/${research.slug}`}>
                      Baca Sekarang
                    </Link>
                  </Button>
                </div>

                <div className="hidden items-end justify-end gap-5 md:flex">
                  <div className="flex flex-col gap-2 lg:gap-3">
                    <span className="font-medium text-zinc-200 dark:text-zinc-300">
                      Ditulis oleh
                    </span>
                    <span className="font-semibold text-zinc-50 dark:text-zinc-200">
                      {research.authors[0]?.user.name}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 lg:gap-3">
                    <span className="font-medium text-zinc-200 dark:text-zinc-300">
                      Diterbikan pada
                    </span>
                    <span className="font-semibold text-zinc-50 dark:text-zinc-200">
                      {new Date(research.publishedDate!).toLocaleDateString(
                        "id-ID",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-start gap-2">
                {Array.from({ length: researchLength ?? 3 }).map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "mt-5 h-3 w-3 hover:cursor-pointer",
                      activeIndex === index
                        ? "bg-zinc-100 outline outline-1 outline-zinc-100 dark:bg-zinc-200 dark:outline-zinc-200"
                        : "bg-transparent outline outline-1 outline-zinc-100 dark:outline-zinc-200",
                    )}
                    onClick={() => handleNav(index)}
                  />
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ResearchCarousel;
