/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";

import "swiper/css";
import { BENEFIT_ITEMS } from "@/constants";
import { useTranslations } from "next-intl";
import styles from "../styles/benefit-slider.module.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Circle } from "lucide-react";
const BenefitSlider = () => {
  const t = useTranslations("PAGE.PUBLIC.HOME-PAGE.SECTION.BENEFIT-SECTION");
  const sliderRef = React.useRef<SwiperRef>(null);
  const [isBeginning, setIsBeginning] = React.useState(true);
  const [isEnd, setIsEnd] = React.useState(false);

  const handlePrev = React.useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.swiper.slidePrev();
    }
  }, []);

  const handleNext = React.useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.swiper.slideNext();
    }
  }, []);

  const onSlideChange = React.useCallback((swiper: SwiperClass) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-5">
        <article className="flex flex-col gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-7 ">
          <span className="bg-[#FFE5E8] p-2 rounded-[50px] w-fit flex items-center gap-[10px] text-[14px] lg:text-[16px] leading-[18px] lg:leading-5">
            <Circle className="size-2" fill="#980517" color="#980517" />
            {t("sub-heading")}
          </span>
          <div className="flex flex-col gap-2 lg:gap-3 2xl:gap-4 md:max-w-[70%] 2xl:max-w-[45%]">
            <h2 className="text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[48px] leading-9 md:leading-10 lg:leading-11 xl:leading-12 2xl:leading-13 tracking-[-1px]">
              {t("heading")}
            </h2>
            <p className="text-[#A3A3A3] text-[16px] leading-5">{t("body")}</p>
          </div>
        </article>
        <div className="flex items-center gap-3 w-fit">
          <Button
            onClick={handlePrev}
            aria-label="Previous slide"
            className={`border-solid border border-[#E7E7E7] rounded-[8px] bg-transparent h-12 aspect-square flex items-center justify-center ${
              isBeginning ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <ArrowLeft className="text-primary size-6" strokeWidth={2.5} />
          </Button>
          <Button
            onClick={handleNext}
            aria-label="Next slide"
            className={`border-solid border border-primary rounded-[8px] h-12 aspect-square flex items-center justify-center ${
              isEnd ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <ArrowRight
              className="text-primary-foreground size-6"
              strokeWidth={2.5}
            />
          </Button>
        </div>
      </div>
      <Swiper
        ref={sliderRef}
        slidesPerView={"auto"}
        spaceBetween={16}
        className="mySwiper w-full"
        onSlideChange={onSlideChange}
        onSwiper={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {BENEFIT_ITEMS.map((benefit) => (
          <SwiperSlide
            key={`${benefit.id}-${benefit.title}`}
            className={`${styles.swiperSlide}`}
          >
            <article className="flex flex-col justify-between border border-solid border-[#F1F1F1] rounded-2xl p-7 h-[280px] aspect-square lg:aspect-auto md:w-full md:h-[300px] md:max-w-[300px] lg:max-w-[360px] xl:max-w-[380px] 2xl:max-w-[450px]">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-[24px] lg:text-[32px] 2xl:text-[40px] leading-7 lg:leading-9 2xl:leading-11 tracking--0.5px] text-wrap">
                  {t(benefit.title as any)}
                </h3>
                <span className="relative aspect-square min-w-12 w-12 lg:w-14 lg:min-w-14 2xl:w-16 2xl:min-w-16">
                  <Image
                    src={benefit.icon}
                    alt={`${benefit.title} Icon`}
                    fill
                  />
                </span>
              </div>
              <p className="text-[#A3A3A3] text-[14px] leading-[18px]">
                {t(benefit.description as any)}
              </p>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default BenefitSlider;
