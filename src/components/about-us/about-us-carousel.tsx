"use client";
import React from "react";
import Image from "next/image";

import type { labManagersCarouselProps } from "~/typeSchema/about-us-types";

import "swiper/css";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const LabManagersCarousel = ({
  labManagers,
}: {
  labManagers: labManagersCarouselProps[];
}) => {
  return (
    <section className="mt-10 w-full px-5 lg:px-20">
      <Swiper
        spaceBetween={20}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="h-96 w-full lg:h-80"
        breakpoints={{
          // ketika lebar viewport >= 0px
          0: {
            slidesPerView: 1,
          },
          // ketika lebar viewport >= 768px (md)
          768: {
            slidesPerView: 2,
          },
          // ketika lebar viewport >= 1024px (lg)
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {labManagers?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="group relative h-full overflow-hidden">
              <Image
                src={item.image ?? ""}
                alt={item.name ?? ""}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="flex h-full w-full items-end p-5">
                <div className="flex w-full flex-col items-start justify-end gap-2 bg-zinc-200 p-4 dark:bg-zinc-800">
                  <span className="line-clamp-2 text-xs font-medium">
                    {item.name}
                  </span>
                  <span className="line-clamp-1 text-xs text-muted-foreground">
                    {item.job}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default LabManagersCarousel;
