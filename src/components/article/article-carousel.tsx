"use client";

import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";

import type { articleCarouselProps } from "~/typeSchema/article-page-types";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import type { Swiper as SwiperType } from "swiper";

import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";

const ArticleCarousel = ({
  articlesHeadline,
}: {
  articlesHeadline: articleCarouselProps[];
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // Refs for accessing Swiper instances
  const swiperRef = useRef<SwiperType | null>(null);
  const handleNav = useCallback((index: number) => {
    swiperRef.current?.slideTo(index);
  }, []);

  const articleLength = articlesHeadline?.length;

  if (!articlesHeadline || articlesHeadline.length === 0) {
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
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay]}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
        className="h-full w-full"
      >
        {articlesHeadline?.map((article, index) => (
          <SwiperSlide key={index} className="relative h-full w-full">
            <Image
              src={article.coverImg}
              alt={`${article.title} Image`}
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
                    className="dark:bg-zinc-300 dark:text-zinc-900"
                  >
                    {article.categories[0]?.category.name}
                  </Badge>

                  <h2 className="mt-5 line-clamp-2 stroke-zinc-900 stroke-2 text-xl font-medium text-zinc-50 dark:text-zinc-200 md:text-2xl lg:text-3xl">
                    {article.title}
                  </h2>
                  <p className="mt-5 line-clamp-2 text-zinc-200">
                    {article.summary}
                  </p>
                  <Button
                    asChild
                    variant={"secondary"}
                    className="mt-10 w-min dark:bg-zinc-300 dark:text-zinc-900"
                  >
                    <Link href={`/berita/${article.slug}`}>Baca Sekarang</Link>
                  </Button>
                </div>

                <div className="hidden items-end justify-end gap-5 md:flex">
                  <div className="flex flex-col gap-2 lg:gap-3">
                    <span className="font-medium text-zinc-200 dark:text-zinc-300">
                      Ditulis oleh
                    </span>
                    <span className="font-semibold text-zinc-50 dark:text-zinc-200">
                      {article.user.name}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 lg:gap-3">
                    <span className="font-medium text-zinc-200 dark:text-zinc-300">
                      Diterbikan pada
                    </span>
                    <span className="font-semibold text-zinc-50 dark:text-zinc-200">
                      {new Date(article.publishedDate!).toLocaleDateString(
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
                {Array.from({ length: articleLength ?? 3 }).map((_, index) => (
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

export default ArticleCarousel;
