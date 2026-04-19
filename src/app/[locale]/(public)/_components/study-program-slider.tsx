/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { STUDY_PROGRAM_ITEMS } from "@/constants";
import { ArrowLeft, Circle } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { TStudyProgram } from "@/types";
import { Button } from "@/components/ui/button";

const StudyProgramSlider = () => {
  const t = useTranslations(
    "PAGE.PUBLIC.HOME-PAGE.SECTION.STUDY-PROGRAM-SECTION"
  );
  const [studyProgramData, setStudyProgramData] = React.useState<
    TStudyProgram[]
  >(STUDY_PROGRAM_ITEMS.slice(1));
  const [transitionData, setTransitionData] = React.useState<TStudyProgram>(
    STUDY_PROGRAM_ITEMS[0]
  );

  const [currentSlideData, setCurrentSlideData] = React.useState({
    data: STUDY_PROGRAM_ITEMS[0],
    index: 0,
  });

  const handlePrev = () => {
    const prevIndex =
      (currentSlideData.index - 1 + STUDY_PROGRAM_ITEMS.length) %
      STUDY_PROGRAM_ITEMS.length;
    const prevItem = STUDY_PROGRAM_ITEMS[prevIndex];

    setCurrentSlideData({
      data: prevItem,
      index: prevIndex,
    });

    const newList = [];

    for (let i = 1; i < STUDY_PROGRAM_ITEMS.length; i++) {
      const idx = (prevIndex + i) % STUDY_PROGRAM_ITEMS.length;
      newList.push(STUDY_PROGRAM_ITEMS[idx]);
    }

    setStudyProgramData(newList);
    setTransitionData(prevItem);
  };

  const handleNext = () => {
    const nextIndex = (currentSlideData.index + 1) % STUDY_PROGRAM_ITEMS.length;
    const nextItem = STUDY_PROGRAM_ITEMS[nextIndex];

    setCurrentSlideData({
      data: nextItem,
      index: nextIndex,
    });

    setStudyProgramData((prev) => {
      const newList = [...prev.slice(1), nextItem];
      return newList;
    });

    setTransitionData(nextItem);
  };

  return (
    <>
      <article className="flex flex-col gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-7 ">
        <div className="flex flex-col lg:justify-between lg:flex-row gap-[6px] lg:items-end">
          <div className="flex flex-col gap-[6px]">
            <span className="bg-[#FFE5E8] p-2 rounded-[50px] w-fit flex items-center gap-[10px] text-[14px] lg:text-[16px] leading-[18px] lg:leading-5">
              <Circle className="size-2" fill="#980517" color="#980517" />
              {t("sub-heading")}
            </span>
            <div className="flex flex-col gap-2 lg:gap-3 2xl:gap-4 md:max-w-[70%] 2xl:max-w-[75%]">
              <h2 className="text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[48px] leading-9 md:leading-10 lg:leading-11 xl:leading-12 2xl:leading-13 tracking-[-1px]">
                {t("heading")}
              </h2>
              <p className="text-[#A3A3A3] text-[16px] leading-5">
                {t("body")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-fit">
            <Button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="border border-solid border-[#E7E7E7] bg-transparent rounded-[8px] w-12 lg:w-[52px] aspect-square h-auto"
            >
              <ArrowLeft className="text-primary size-6" strokeWidth={2.5} />
            </Button>
            <Button
              onClick={handleNext}
              aria-label="Next slide"
              className="border border-solid border-primary bg-primary rounded-[8px] w-12 lg:w-[52px] aspect-square h-auto"
            >
              <ArrowLeft
                className="text-primary-foreground size-6 rotate-180"
                strokeWidth={2.5}
              />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-4">
          {transitionData && (
            <motion.div
              key={transitionData.id}
              className="flex flex-col gap-4 lg:h-full"
            >
              <motion.div
                key={transitionData.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:rounded-[20px] relative w-full aspect-[89/70] lg:aspect-[4/3] rounded-[12px]"
              >
                <Image
                  src={transitionData.image as string}
                  alt=""
                  fill
                  className="object-cover rounded-[12px] lg:rounded-[20px]"
                />
              </motion.div>

              <div className="artilce-body flex flex-col gap-2 lg:hidden">
                <h3 className="text-black text-[24px] leading-7">
                  {t(transitionData.name as any)}
                </h3>
                <p className="text-[14px] leading-[18px] text-[#A3A3A3]">
                  {t(transitionData.description as any)}
                </p>
              </div>
            </motion.div>
          )}
          <div className="lg:flex lg:flex-col justify-between">
            <div className="transition">
              {transitionData && (
                <motion.div
                  key={transitionData.id}
                  className="flex flex-col gap-4 lg:h-full"
                >
                  <h3 className="text-[36px] leading-10">
                    {t(transitionData.name as any)}
                  </h3>
                  <p className="text-[16px] leading-5 font-medium text-[#A3A3A3]">
                    {t(transitionData.description as any)}
                  </p>
                </motion.div>
              )}
            </div>
            <div className="flex items-center flex-nowrap lg:items-end overflow-x-hidden gap-4 ">
              {studyProgramData.map((studyProgram) => (
                <div key={studyProgram.id} className="flex flex-col w-full">
                  <span>{t(studyProgram.name as any)}</span>
                  <div className="relative w-full min-w-[108px] md:min-w-[208px] aspect-square lg:h-[229px] rounded-[8px]">
                    <Image
                      src={studyProgram.image as string}
                      fill
                      alt=""
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default StudyProgramSlider;
