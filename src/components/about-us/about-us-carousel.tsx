"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import type { Swiper as SwiperType } from "swiper";
import type { labManagersCarouselProps } from "~/typeSchema/about-us-types";

import "swiper/css";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getWindowSizeBreakpoint } from "~/hooks/get-window-size-breakpoint";

const LabManagersCarousel = ({
  labManagers,
}: {
  labManagers: labManagersCarouselProps[];
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [slidesPerView, setSlidesPerView] = useState<number>(4);

  useEffect(() => {
    const handleResize = () => {
      const breakPoint = getWindowSizeBreakpoint();
      switch (breakPoint) {
        case "xs":
          setSlidesPerView(1);
          break;
        case "sm":
          setSlidesPerView(1);
          break;
        case "md":
          setSlidesPerView(2);
          break;
        default:
          setSlidesPerView(4);
          break;
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="mt-10 w-full px-5 lg:px-20">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={20}
        slidesPerView={slidesPerView}
        autoplay={{
          delay: 2500,
        }}
        modules={[Autoplay]}
        className="h-96 w-full lg:h-80"
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
