"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import type { Swiper as SwiperType } from "swiper";
import type {
  LabDetailServiceCarouselProps,
  ServiceWithNumberPrice,
} from "~/typeSchema/laboratory-detail-types";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { Button } from "~/components/ui/button";
import { getUnitPrice } from "~/hooks/get-price-unit";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";

const LabDetailServiceCarousel: React.FC<LabDetailServiceCarouselProps> = (
  props,
) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Memoized handlers for navigation
  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  // Effect to handle window resize and set vertical/horizontal layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Memoized render function for main swiper slides
  const renderSwiperSlide = useCallback(
    (service: ServiceWithNumberPrice, index: number) => (
      <SwiperSlide key={index} className="relative !h-full">
        <Card className="flex h-full flex-col justify-center rounded-md">
          <CardHeader>
            <Package className="h-6 w-6" />
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <CardTitle className="line-clamp-2 font-medium leading-6">
              {service.name}
            </CardTitle>
            <CardDescription className="line-clamp-3">
              {service.description}
            </CardDescription>
          </CardContent>
          <CardFooter className="line-clamp-1 flex items-center justify-start gap-1">
            <span className="text-2xl font-semibold">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(Number(service.price))}
            </span>
            <span>{" / "}</span>
            <span className="text-sm text-muted-foreground">
              {getUnitPrice(service.unit)}
            </span>
          </CardFooter>
        </Card>
      </SwiperSlide>
    ),
    [],
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-semibold">Layanan</h3>

        <div className="flex items-center justify-between gap-5">
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={handlePrev}
            disabled={activeIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={handleNext}
            disabled={
              activeIndex === (props.services?.length ?? 0) - (isMobile ? 1 : 2)
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {props.services ? (
        <div className="mt-5 w-full">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={isMobile ? 1 : 2}
            spaceBetween={20}
            className="main-swiper mb-2"
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
            }}
          >
            {props.services.map(renderSwiperSlide)}
          </Swiper>

          <div className="mt-5 flex">
            {isMobile ? (
              <span className="mx-auto text-center text-sm text-muted-foreground lg:hidden">
                {props.services?.length === 0
                  ? "Layanan 0 dari 0 layanan"
                  : `Layanan ${activeIndex + 1} dari ${props.services?.length} layanan`}
              </span>
            ) : (
              <span className="mx-auto hidden text-center text-sm text-muted-foreground lg:block">
                {props.services?.length <= 1
                  ? `Menampilkan 1 dari ${props.services?.length ?? 0} layanan`
                  : `Menampilkan ${activeIndex + 1} - ${activeIndex + 2} dari ${props.services?.length} layanan`}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div>Tidak ada data layanan tersedia</div>
      )}
    </div>
  );
};

export default LabDetailServiceCarousel;
