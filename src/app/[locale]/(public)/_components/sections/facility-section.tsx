/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTransform, useScroll } from "framer-motion";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { FACILITY_ITEMS } from "@/constants";
import SubTitleBadge from "../sub-title-badge";
import { useHeaderVisibilityStore } from "@/stores/use-header-visibility-store";
// import useWindowSize from "@/hooks/useWindowSize";

const FacilitySection = () => {
  const t = useTranslations("PAGE.PUBLIC.HOME-PAGE.SECTION.FACILITY-SECTION");
  const sectionRef = React.useRef(null);
  const setHideHeader = useHeaderVisibilityStore(
    (state) => state.setHideHeader
  );

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideHeader(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [setHideHeader]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });

  // const useResponsiveCardTransform = (
  //   scrollYProgress: any,
  //   cardCount: number
  // ) => {
  //   const { width } = useWindowSize();

  //   const { cardWidth, scrollRange } = React.useMemo(() => {
  //     if (!width) {
  //       return {
  //         cardWidth: 400,
  //         scrollRange: [0.15, 0.75] as [number, number],
  //       };
  //     }

  //     if (width >= 1536) {
  //       // 2xl
  //       return {
  //         cardWidth: 500,
  //         scrollRange: [0.15, 0.75],
  //       };
  //     } else if (width >= 1280) {
  //       // xl
  //       return {
  //         cardWidth: 450,
  //         scrollRange: [0.1, 0.3],
  //       };
  //     } else if (width >= 1024) {
  //       // lg
  //       return {
  //         cardWidth: 400,
  //         scrollRange: [0.1, 0.3],
  //       };
  //     } else if (width >= 768) {
  //       return {
  //         cardWidth: 450,
  //         scrollRange: [0.07, 0.3],
  //       };
  //     } else {
  //       // mobile
  //       return {
  //         cardWidth: 350,
  //         scrollRange: [0.15, 0.4],
  //       };
  //     }
  //   }, [width]);

  //   const totalX = -(cardCount * cardWidth);

  //   const cardX = useTransform(scrollYProgress, scrollRange, [
  //     "0%",
  //     `${totalX}px`,
  //   ]);

  //   return cardX;
  // };

  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const headingY = useTransform(scrollYProgress, [0, 0.15], ["0%", "-30px"]);

  const cardX = useTransform(scrollYProgress, [0.3, 1], ["1%", "-95%"]);
  const cardOpacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);
  const cardXDesktop = useTransform(scrollYProgress, [0.1, 1], ["1%", "-95%"]);
  // const cardXDesktop = useResponsiveCardTransform(
  //   scrollYProgress,
  //   FACILITY_ITEMS.length
  // );
  return (
    <LazyMotion features={domAnimation}>
      {" "}
      <section
        id="home-page-facility-section"
        ref={sectionRef}
        className="relative h-[500vh] md:h-[300vh] lg:h-[600dvh] bg-white p-3"
      >
        {/* Mobile */}
        <div className="md:hidden sticky top-0 h-[100dvh] bg-[#F7F7F9] rounded-[20px] border border-[#EAEAEA] padding-x-global padding-y-global overflow-hidden">
          <m.article
            style={{ opacity: headingOpacity, y: headingY }}
            className="absolute w-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 text-center"
          >
            <SubTitleBadge subTitle={t("sub-heading")} />
            <h2 className="text-[32px] leading-9 text-black tracking-[-1px] capitalize mt-2">
              {t("heading")}
            </h2>
          </m.article>
          <div className="flex h-full items-center">
            <m.div
              style={{ x: cardX, opacity: cardOpacity }}
              className="flex gap-4"
            >
              <article className="aspect-[0.75] min-w-[350px] w-[350px] overflow-hidden relative rounded-[12px]">
                <Image
                  src={FACILITY_ITEMS[0].image}
                  fill
                  alt="Facility Example Image"
                  className="object-cover rounded-[12px]"
                />
                <div className="bg-[rgba(51,51,51,0.64)] w-full h-full absolute top-0 left-0 rounded-[12px]" />
                <div className="absolute top-0 left-0 w-full h-full p-[60px] flex flex-col justify-end gap-4 text-white">
                  <h3 className="text-[24px] leading-7 font-medium">
                    {t(FACILITY_ITEMS[0].title as any)}
                  </h3>
                  <p className="text-[14px] font-medium leading-[18px]">
                    {t(FACILITY_ITEMS[0].description as any)}
                  </p>
                </div>
              </article>

              <article className="aspect-[0.75] min-w-[350px] w-[350px] overflow-hidden relative rounded-[12px]">
                <Image
                  src={FACILITY_ITEMS[1].image}
                  fill
                  alt="Facility Example Image"
                  className="object-cover rounded-[12px]"
                />
                <div className="bg-[rgba(51,51,51,0.64)] w-full h-full absolute top-0 left-0 rounded-[12px]" />
                <div className="absolute top-0 left-0 w-full h-full p-[60px] flex flex-col justify-end gap-4 text-white">
                  <h3 className="text-[24px] leading-7 font-medium">
                    {t(FACILITY_ITEMS[1].title as any)}
                  </h3>
                  <p className="text-[14px] font-medium leading-[18px]">
                    {t(FACILITY_ITEMS[1].description as any)}
                  </p>
                </div>
              </article>
              {FACILITY_ITEMS.map((facility, index) => {
                if (index < 2) return null;

                const layoutIndex = (index - 2) % 3;

                return (
                  <React.Fragment key={`${facility.id}-${index}`}>
                    {layoutIndex === 0 && (
                      <article
                        key={`${facility.id}-${index}`}
                        className="aspect-[0.75] min-w-[350px] w-[350px] flex flex-col-reverse text-white gap-4 justify-between overflow-hidden relative rounded-[12px]"
                      >
                        <div className="rounded-[12px] p-7 bg-primary h-fit">
                          <p className="text-[16px] lg:text-[20px] leading-5 lg:leading-6 font-medium tracking-[-0.5px] text-center">
                            {t(facility.description2 as any)}
                          </p>
                        </div>

                        <div className="relative w-full h-full">
                          <Image
                            src={facility.image}
                            fill
                            alt="Facility Example Image"
                            className="object-cover rounded-[12px]"
                          />
                          <div className="bg-[rgba(51,51,51,0.64)] w-full h-full absolute top-0 left-0 rounded-[12px]" />
                          <div className="absolute top-0 left-0 w-full h-full p-[60px] flex flex-col justify-end gap-4">
                            <h3 className="text-[24px] leading-7 font-medium">
                              {t(facility.title as any)}
                            </h3>
                            <p className="text-[14px] font-medium leading-[18px]">
                              {t(facility.description as any)}
                            </p>
                          </div>
                        </div>
                      </article>
                    )}

                    {layoutIndex === 1 && (
                      <article
                        key={`${facility.id}-${index}`}
                        className="aspect-[0.75] min-w-[350px] w-[350px] overflow-hidden relative rounded-[12px]"
                      >
                        <Image
                          src={facility.image}
                          fill
                          alt="Facility Example Image"
                          className="object-cover rounded-[12px]"
                        />
                        <div className="bg-[rgba(51,51,51,0.64)] w-full h-full absolute top-0 left-0 rounded-[12px]" />
                        <div className="absolute top-0 left-0 w-full h-full p-[60px] flex flex-col justify-end gap-4 text-white">
                          <h3 className="text-[24px] leading-7 font-medium">
                            {t(facility.title as any)}
                          </h3>
                          <p className="text-[14px] font-medium leading-[18px]">
                            {t(facility.description as any)}
                          </p>
                        </div>
                      </article>
                    )}

                    {layoutIndex === 2 && (
                      <article
                        key={`${facility.id}-${index}`}
                        className="aspect-[0.75] min-w-[350px] w-[350px] flex flex-col text-white gap-4 justify-between overflow-hidden relative rounded-[12px]"
                      >
                        <div className="rounded-[12px] p-7 bg-primary h-fit">
                          <p className="text-[16px] lg:text-[20px] leading-5 lg:leading-6 font-medium tracking-[-0.5px] text-center">
                            {t(facility.description2 as any)}
                          </p>
                        </div>

                        <div className="relative w-full h-full">
                          <Image
                            src={facility.image}
                            fill
                            alt="Facility Example Image"
                            className="object-cover rounded-[12px]"
                          />
                          <div className="bg-[rgba(51,51,51,0.64)] w-full h-full absolute top-0 left-0 rounded-[12px]" />
                          <div className="absolute top-0 left-0 w-full h-full p-[60px] flex flex-col justify-end gap-4">
                            <h3 className="text-[24px] leading-7 font-medium">
                              {t(facility.title as any)}
                            </h3>
                            <p className="text-[14px] font-medium leading-[18px]">
                              {t(facility.description as any)}
                            </p>
                          </div>
                        </div>
                      </article>
                    )}
                  </React.Fragment>
                );
              })}
            </m.div>
          </div>
        </div>

        {/* Tablet - Desktop */}
        <div className="hidden md:block sticky top-0 h-[100dvh] bg-[#F7F7F9] rounded-[20px] border border-[#EAEAEA] padding-x-global padding-y-global overflow-hidden">
          <div className="flex h-full items-center">
            <m.div style={{ x: cardXDesktop }} className="flex gap-4">
              <article className="flex flex-col justify-center items-center h-auto aspect-[0.75] min-w-[400px] w-[400px] overflow-hidden relative rounded-[12px] text-center">
                <SubTitleBadge subTitle={t("sub-heading")} />
                <h2 className="text-[32px] leading-9 text-black tracking-[-1px] capitalize mt-2">
                  {t("heading")}
                </h2>
              </article>
              <article className="h-auto aspect-[0.75] min-w-[400px] w-[400px] overflow-hidden relative rounded-[12px]">
                <Image
                  src={FACILITY_ITEMS[0].image}
                  fill
                  alt="Facility Example Image"
                  className="object-cover rounded-[12px]"
                />
                <div className="bg-[#333333A3] w-full h-full absolute top-0 left-0" />
                <div className="absolute top-0 left-0 w-full h-full p-[60px] flex flex-col justify-end gap-4 text-white">
                  <h3 className="text-[24px] leading-7 font-medium">
                    {t(FACILITY_ITEMS[0].title as any)}
                  </h3>
                  <p className="text-[14px] font-medium leading-[18px]">
                    {t(FACILITY_ITEMS[0].description as any)}
                  </p>
                </div>
              </article>
              <article className="h-auto aspect-[0.75] min-w-[400px] w-[400px] overflow-hidden relative rounded-[12px]">
                <Image
                  src={FACILITY_ITEMS[1].image}
                  fill
                  alt="Facility Example Image"
                  className="object-cover rounded-[12px]"
                />
                <div className="bg-[#333333A3] w-full h-full absolute top-0 left-0" />
                <div className="absolute top-0 left-0 w-full h-full p-[60px] flex flex-col justify-end gap-4 text-white">
                  <h3 className="text-[24px] leading-7 font-medium">
                    {t(FACILITY_ITEMS[1].title as any)}
                  </h3>
                  <p className="text-[14px] font-medium leading-[18px]">
                    {t(FACILITY_ITEMS[1].description as any)}
                  </p>
                </div>
              </article>
              {FACILITY_ITEMS.map((facility, index) => {
                if (index < 2) return null;

                const layoutIndex = (index - 2) % 3;

                return (
                  <React.Fragment key={`${facility.id}-${index}`}>
                    {layoutIndex === 0 && (
                      <article className="h-auto aspect-[0.75] min-w-[400px] w-[400px] flex flex-col-reverse text-white gap-4 justify-between overflow-hidden relative rounded-[12px]">
                        <div className="rounded-[12px] p-7 bg-primary h-fit">
                          <p className="text-[16px] lg:text-[20px] leading-5 lg:leading-6 font-medium tracking-[-0.5px] text-center">
                            {t(facility.description2 as any)}
                          </p>
                        </div>

                        <div className="relative w-full h-full">
                          <Image
                            src={facility.image}
                            fill
                            alt="Facility Example Image"
                            className="object-cover rounded-[12px]"
                          />
                          <div className="bg-[#333333A3] w-full h-full absolute top-0 left-0 rounded-[12px]" />
                          <div className="absolute top-0 left-0 w-full h-full p-[60px] flex flex-col justify-end gap-4">
                            <h3 className="text-[24px] leading-7 font-medium">
                              {t(facility.title as any)}
                            </h3>
                            <p className="text-[14px] font-medium leading-[18px]">
                              {t(facility.description as any)}
                            </p>
                          </div>
                        </div>
                      </article>
                    )}

                    {layoutIndex === 1 && (
                      <article className="h-auto aspect-[0.75] min-w-[400px] w-[400px] overflow-hidden relative rounded-[12px]">
                        <Image
                          src={facility.image}
                          fill
                          alt="Facility Example Image"
                          className="object-cover rounded-[12px]"
                        />
                        <div className="bg-[#333333A3] w-full h-full absolute top-0 left-0 rounded-[12px]" />
                        <div className="absolute top-0 left-0 w-full h-full p-[60px] flex flex-col justify-end gap-4 text-white">
                          <h3 className="text-[24px] leading-7 font-medium">
                            {t(facility.title as any)}
                          </h3>
                          <p className="text-[14px] font-medium leading-[18px]">
                            {t(facility.description as any)}
                          </p>
                        </div>
                      </article>
                    )}

                    {layoutIndex === 2 && (
                      <article
                        key={`${facility.id}-${index}`}
                        className="h-auto aspect-[0.75] min-w-[400px] w-[400px] flex flex-col text-white gap-4 justify-between overflow-hidden relative rounded-[12px] "
                      >
                        <div className="rounded-[12px] p-7 bg-primary h-fit">
                          <p className="text-[16px] lg:text-[20px] leading-5 lg:leading-6 font-medium tracking-[-0.5px] text-center">
                            {t(facility.description2 as any)}
                          </p>
                        </div>

                        <div className="relative w-full h-full">
                          <Image
                            src={facility.image}
                            fill
                            alt="Facility Example Image"
                            className="object-cover rounded-[12px]"
                          />
                          <div className="bg-[#333333A3] w-full h-full absolute top-0 left-0 rounded-[12px]" />
                          <div className="absolute top-0 left-0 w-full h-full p-[60px] flex flex-col justify-end gap-4">
                            <h3 className="text-[24px] leading-7 font-medium">
                              {t(facility.title as any)}
                            </h3>
                            <p className="text-[14px] font-medium leading-[18px]">
                              {t(facility.description as any)}
                            </p>
                          </div>
                        </div>
                      </article>
                    )}
                  </React.Fragment>
                );
              })}
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default FacilitySection;
