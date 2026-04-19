"use client";

import { useTranslations } from "next-intl";
import * as React from "react";
import SubTitleBadge from "./sub-title-badge";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutUsSlider = () => {
  const t = useTranslations("PAGE.PUBLIC.HOME-PAGE.SECTION.ABOUT-US-SECTION");

  const videoCount = 2;
  const videoRefs = React.useRef<HTMLVideoElement[]>([]);
  const [isPlaying, setIsPlaying] = React.useState<boolean[]>(
    Array(videoCount).fill(false)
  );

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

    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    setIsPlaying(Array(videoCount).fill(false));
  }, []);

  const handleToggleVideo = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying((prev) => {
        const updated = [...prev];
        updated[index] = true;
        return updated;
      });
    } else {
      video.pause();
      setIsPlaying((prev) => {
        const updated = [...prev];
        updated[index] = false;
        return updated;
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full lg:justify-between  h-full">
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-end gap-3">
        <div className="flex flex-col gap-3">
          <SubTitleBadge subTitle={t("HEADING.sub-title")} />
          <div className="flex flex-col gap-2">
            <h2 className="text-[32px] leading-9 text-[#121212] tracking-[-1px]">
              {t("HEADING.title")}
            </h2>
            <p className="text-[16px] leading-5 text-[#A3A3A3]">
              {t("HEADING.description")}
            </p>
          </div>
        </div>
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
        onSlideChange={onSlideChange}
        slidesPerView={1}
        className="mySwiper w-full min-w-0"
        spaceBetween={16}
      >
        {Array.from({ length: videoCount }).map((_, index) => (
          <SwiperSlide key={index}>
            <div className="relative rounded-[12px] lg:rounded-[20px] group">
              <video
                ref={(el) => {
                  if (el) videoRefs.current[index] = el;
                }}
                src="/assets/videos/home/about-us-example-video.webm"
                className="object-cover rounded-[12px] lg:rounded-[20px] w-full h-[352px] 2xl:aspect-[16/9] 2xl:h-auto"
              ></video>
              <div className="bg-[#333333] opacity-60 absolute top-0 left-0 w-full h-full rounded-[12px] lg:rounded-[20px]" />
              <div className="absolute top-0 left-0 w-full h-full p-5 lg:p-10 flex items-end rounded-[12px] lg:rounded-[20px] ">
                <Button
                  onClick={() => handleToggleVideo(index)}
                  className="flex h-auto !bg-transparent cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center gap-5"
                >
                  <div className="size-[52px] flex items-center justify-center border-2 border-solid border-white/80 rounded-full">
                    {isPlaying[index] ? (
                      <Pause color="#F1F2F2" fill="#F1F2F2" />
                    ) : (
                      <Play color="#F1F2F2" fill="#F1F2F2" />
                    )}
                  </div>
                  <span className="hidden md:inline text-[#AEAEAE] text-[20px] leading-6 tracking-[-0.5px]">
                    {isPlaying[index] ? "Pause Video" : "Watch to learn more"}
                  </span>
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AboutUsSlider;
