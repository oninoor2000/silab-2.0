"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect, useCallback } from "react";

import { Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import type { Swiper as SwiperType } from "swiper";
import type { LaboratoryImage } from "@prisma/client";
import type { LabDetailGalleryProps } from "~/typeSchema/laboratory-detail-types";

import "swiper/css";

import { Button } from "~/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const LabDetailGallery: React.FC<LabDetailGalleryProps> = ({ images }) => {
  // State for managing the thumbs swiper, active index, and layout orientation
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVertical, setIsVertical] = useState(false);

  // Refs for accessing Swiper instances
  const swiperRef = useRef<SwiperType | null>(null);
  const thumbsSwiperRef = useRef<SwiperType | null>(null);

  // Memoized handlers for navigation
  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  // Function to center the thumb in the thumbs swiper
  const centerThumb = useCallback(
    (index: number) => {
      if (!thumbsSwiperRef.current) return;

      const totalSlides = images.length;
      const slidesPerView = thumbsSwiperRef.current.params
        .slidesPerView as number;
      const halfSlidesPerView = Math.floor(slidesPerView / 2);

      let targetIndex;
      if (index < halfSlidesPerView) {
        targetIndex = 0;
      } else if (index >= totalSlides - halfSlidesPerView) {
        targetIndex = totalSlides - slidesPerView;
      } else {
        targetIndex = index - halfSlidesPerView;
      }

      thumbsSwiperRef.current.slideTo(targetIndex);
    },
    [images.length],
  );

  // Handler for thumb click, memoized to prevent unnecessary re-renders
  const handleThumbClick = useCallback(
    (index: number) => {
      swiperRef.current?.slideTo(index);
      centerThumb(index);
    },
    [centerThumb],
  );

  // Effect to update thumbsSwiperRef when thumbsSwiper changes
  useEffect(() => {
    if (thumbsSwiper) {
      thumbsSwiperRef.current = thumbsSwiper;
    }
  }, [thumbsSwiper]);

  // Effect to handle window resize and set vertical/horizontal layout
  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Memoized render function for main swiper slides
  const renderSwiperSlide = useCallback(
    (image: LaboratoryImage, index: number) => (
      <SwiperSlide key={index} className="relative h-full bg-slate-100">
        <Image
          src={image.imageUrl}
          alt={`Lab image ${index + 1}`}
          fill={true}
          sizes="(max-width: 768px) 100vw, 83vw"
          className="object-cover"
          priority
        />
      </SwiperSlide>
    ),
    [],
  );

  // Memoized render function for thumb swiper slides
  const renderThumbSlide = useCallback(
    (image: LaboratoryImage, index: number) => (
      <SwiperSlide
        key={index}
        className={`relative cursor-pointer transition-opacity ${
          activeIndex === index ? "opacity-100" : "opacity-50"
        }`}
        onClick={() => handleThumbClick(index)}
      >
        <Image
          src={image.imageUrl}
          alt={`Lab thumbnail ${index + 1}`}
          fill={true}
          sizes="(max-width: 768px) 33vw, 16vw"
          className="object-cover"
        />
      </SwiperSlide>
    ),
    [activeIndex, handleThumbClick],
  );

  return (
    <div className="relative flex h-[50vh] flex-col items-center justify-between gap-5 md:h-[55vh] md:flex-row lg:h-[75vh] lg:gap-10">
      {/* Main Swiper */}
      <div className="relative h-[40vh] w-full md:h-full md:w-5/6">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={10}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Thumbs]}
          className="main-swiper h-full"
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
            centerThumb(swiper.activeIndex);
          }}
        >
          {images.map(renderSwiperSlide)}
        </Swiper>

        {/* Navigation Buttons */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 md:left-5"
          onClick={handlePrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 md:right-5"
          onClick={handleNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Thumbs Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        direction={isVertical ? "vertical" : "horizontal"}
        spaceBetween={20}
        slidesPerView={3}
        modules={[Thumbs]}
        className={`${isVertical ? "h-full w-1/6" : "h-[10vh] w-full"}`}
      >
        {images.map(renderThumbSlide)}
      </Swiper>
    </div>
  );
};

export default LabDetailGallery;
