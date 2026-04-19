"use client";

import * as React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import SubTitleBadge from "../sub-title-badge";
import * as m from "motion/react-m";
import { useInView } from "framer-motion";
import { LazyMotion, domAnimation } from "motion/react";

interface INewStudentRegistrationProcedureSectionProps {
  subTitle: string;
  firstStep: string;
  secondStep: string;
  thirdStep: string;
  firstStepTitle: string;
  secondStepTitle: string;
  thirdStepTitle: string;
  firstStepDescription: string;
  secondStepDescription: string;
  thirdStepDescription: string;
  firstStepCTABTN1: string;
  firstStepCTABTN2: string;
  secondStepCTABTN1: string;
  thirdStepCTABTN1: string;
  thirdStepCTABTN2: string;
}

const NewStudentRegistrationProcedureSection: React.FC<
  INewStudentRegistrationProcedureSectionProps
> = (props) => {
  const {
    subTitle,
    firstStep,
    secondStep,
    thirdStep,
    firstStepTitle,
    secondStepTitle,
    thirdStepTitle,
    firstStepDescription,
    secondStepDescription,
    thirdStepDescription,
    firstStepCTABTN1,
    firstStepCTABTN2,
    secondStepCTABTN1,
    thirdStepCTABTN1,
    thirdStepCTABTN2,
  } = props;

  const firstcardRef = React.useRef(null);
  const secondCardRef = React.useRef(null);
  const thirdCardRef = React.useRef(null);

  const isInViewFirstCard = useInView(firstcardRef, {
    once: false,
    margin: "0px 0px -60% 0px",
  });
  const isInViewSecondCard = useInView(secondCardRef, {
    once: false,
    margin: "0px 0px -60% 0px",
  });
  const isInViewThirdCard = useInView(thirdCardRef, {
    once: false,
    margin: "0px 0px -60% 0px",
  });

  return (
    <section
      id="home-page-new-student-registration-procedure-section"
      className="p-3 grid grid-cols-1 gap-6"
    >
      <div className="bg-[#F7F7F9] border-[#F7F7F9] rounded-[20px] padding-x-global padding-y-global flex flex-col items-center w-full gap-4">
        <SubTitleBadge subTitle={subTitle} />
        <ul className="hidden lg:flex lg:items-center gap-4 w-full group">
          {/* Desktop View */}

          <li className="overflow-hidden hidden lg:block relative w-full transition-all duration-300 ease-in-out md:col-span-2 lg:col-auto lg:w-[45%] group-hover:w-[27.5%] hover:w-[45%] aspect-[89/110] md:aspect-auto md:h-[420px] h-auto rounded-[12px] group/item">
            <article>
              <Image
                src={"/assets/images/public/home/pmb-example-image.webp"}
                fill
                alt="PMB Example Image"
                className="object-cover rounded-[12px]"
              />
              <div
                className={`group-hover/item:opacity-0 absolute top-0 left-0 w-full h-full rounded-[12px] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] bg-gradient-to-t from-[#333333] to-transparent opacity-100`}
              />
              <div
                className="absolute top-0 left-0 w-full h-full flex flex-col justify-end gap-7 p-4 lg:p-7 
  opacity-100 scale-100 pointer-events-auto transition-all duration-500 ease-in-out
  group-hover/item:opacity-0 group-hover/item:scale-95 group-hover/item:pointer-events-none"
              >
                <div className="flex flex-col gap-2 lg:gap-4">
                  <p className="text-[#F9F6F6] text-[16px] lg:text-[20px] font-medium leading-5 lg:leading-6">
                    {firstStep}
                  </p>
                  <p className="text-white text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] leading-6 lg:leading-8">
                    {firstStepTitle}
                  </p>
                </div>
              </div>

              <div className="opacity-0 group-hover/item:opacity-80 absolute top-0 left-0 w-full h-full rounded-[12px] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] bg-[#333333CC]" />
              <div className="group-hover/item:translate-y-0 group-hover:translate-y-[500px] translate-y-full absolute top-0 left-0 w-full h-full flex flex-col justify-end gap-7 p-4 lg:p-7 transition-all duration-500">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <p className="text-[#F9F6F6] text-[16px] lg:text-[20px] font-medium leading-5 lg:leading-6">
                    {firstStep}
                  </p>
                  <p className="text-white text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] leading-6 lg:leading-8">
                    {firstStepTitle}
                  </p>
                  <p className="text-[14px] text-[#F9F6F6] font-medium leading-[18px]">
                    {firstStepDescription}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row lg:flex-wrap gap-3">
                  <Link
                    target="_blank"
                    href={"/scholarship-register"}
                    className="bg-primary rounded-[8px] py-[6px] pr-[6px] pl-4 w-fit gap-[15px] flex items-center text-[14px] leading-[18px] font-medium text-white"
                  >
                    {firstStepCTABTN1}
                    <span className="bg-primary-foreground rounded-[4px] h-9 aspect-square flex items-center justify-center">
                      <ArrowRight className="size-6 text-primary" />
                    </span>
                  </Link>
                  <Link
                    target="_blank"
                    href={"/pmb"}
                    className="bg-primary rounded-[8px] py-[6px] pr-[6px] pl-4 w-fit gap-[15px] flex items-center text-[14px] leading-[18px] font-medium text-white"
                  >
                    {firstStepCTABTN2}
                    <span className="bg-primary-foreground rounded-[4px] h-9 aspect-square flex items-center justify-center">
                      <ArrowRight className="size-6 text-primary" />
                    </span>
                  </Link>
                  {/* <Link
                  href={"/"}
                  className="bg-primary rounded-[8px] py-[6px] pr-[6px] pl-4 w-fit gap-[15px] flex items-center text-[14px] leading-[18px] font-medium text-white"
                >
                  {firstStepCTABTN3}
                  <span className="bg-primary-foreground rounded-[4px] h-9 aspect-square flex items-center justify-center">
                    <ArrowRight className="size-6 text-primary" />
                  </span>
                </Link> */}
                </div>
              </div>
            </article>
          </li>

          <li className="overflow-hidden hidden lg:block relative w-full transition-all duration-300 ease-in-out aspect-[89/110] lg:w-[27.5%] group-hover:w-[27.5%] hover:w-[45%] lg:aspect-auto lg:h-[420px] h-auto rounded-[12px] group/item">
            <article>
              <Image
                src={"/assets/images/public/home/pmb-example-image.webp"}
                fill
                alt="PMB Example Image"
                className="object-cover rounded-[12px]"
              />
              <div
                className={`group-hover/item:opacity-0 absolute top-0 left-0 w-full h-full rounded-[12px] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] bg-gradient-to-t from-[#333333] to-transparent opacity-100`}
              />
              <div
                className="absolute top-0 left-0 w-full h-full flex flex-col justify-end gap-7 p-4 lg:p-7 
  opacity-100 scale-100 pointer-events-auto transition-all duration-500 ease-in-out
  group-hover/item:opacity-0 group-hover/item:scale-95 group-hover/item:pointer-events-none"
              >
                <div className="flex flex-col gap-2 lg:gap-4">
                  <p className="text-[#F9F6F6] text-[16px] lg:text-[20px] font-medium leading-5 lg:leading-6">
                    {secondStep}
                  </p>
                  <p className="text-white text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] leading-6 lg:leading-8">
                    {secondStepTitle}
                  </p>
                </div>
              </div>

              <div className="opacity-0 group-hover/item:opacity-80 absolute top-0 left-0 w-full h-full rounded-[12px] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] bg-[#333333CC]" />
              <div className="group-hover/item:translate-y-0 group-hover:translate-y-[500px] translate-y-[500px] absolute top-0 left-0 w-full h-full flex flex-col justify-end gap-7 p-4 lg:p-7 transition-all duration-500">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <p className="text-[#F9F6F6] text-[16px] lg:text-[20px] font-medium leading-5 lg:leading-6">
                    {secondStep}
                  </p>
                  <p className="text-white text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] leading-6 lg:leading-8">
                    {secondStepTitle}
                  </p>
                  <p className="text-[14px] text-[#F9F6F6] font-medium leading-[18px]">
                    {secondStepDescription}
                  </p>
                </div>
                <Link
                  target="_blank"
                  href={"/re-register"}
                  className="bg-primary rounded-[8px] py-[6px] pr-[6px] pl-4 w-fit gap-[15px] flex items-center text-[14px] leading-[18px] font-medium text-white"
                >
                  {secondStepCTABTN1}
                  <span className="bg-primary-foreground rounded-[4px] h-9 aspect-square flex items-center justify-center">
                    <ArrowRight className="size-6 text-primary" />
                  </span>
                </Link>
              </div>
            </article>
          </li>

          <li className="overflow-hidden hidden lg:block relative w-full transition-all duration-300 ease-in-out aspect-[89/110] lg:w-[27.5%] group-hover:w-[27.5%] hover:w-[45%] lg:aspect-auto lg:h-[420px] h-auto rounded-[12px] group/item">
            <article>
              <Image
                src={"/assets/images/public/home/pmb-example-image.webp"}
                fill
                alt="PMB Example Image"
                className="object-cover rounded-[12px]"
              />
              <div
                className={`group-hover/item:opacity-0 absolute top-0 left-0 w-full h-full rounded-[12px] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] bg-gradient-to-t from-[#333333] to-transparent opacity-100`}
              />
              <div
                className="absolute top-0 left-0 w-full h-full flex flex-col justify-end gap-7 p-4 lg:p-7 
  opacity-100 scale-100 pointer-events-auto transition-all duration-500 ease-in-out
  group-hover/item:opacity-0 group-hover/item:scale-95 group-hover/item:pointer-events-none"
              >
                <div className="flex flex-col gap-2 lg:gap-4">
                  <p className="text-[#F9F6F6] text-[16px] lg:text-[20px] font-medium leading-5 lg:leading-6">
                    {thirdStep}
                  </p>
                  <p className="text-white text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] leading-6 lg:leading-8">
                    {thirdStepTitle}
                  </p>
                </div>
              </div>

              <div className="opacity-0 group-hover/item:opacity-80 absolute top-0 left-0 w-full h-full rounded-[12px] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] bg-[#333333CC]" />
              <div className="group-hover/item:translate-y-0 group-hover:translate-y-[500px] translate-y-[500px] absolute top-0 left-0 w-full h-full flex flex-col justify-end gap-7 p-4 lg:p-7 transition-all duration-500">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <p className="text-[#F9F6F6] text-[16px] lg:text-[20px] font-medium leading-5 lg:leading-6">
                    {thirdStep}
                  </p>
                  <p className="text-white text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] leading-6 lg:leading-8">
                    {thirdStepTitle}
                  </p>
                  <p className="text-[14px] text-[#F9F6F6] font-medium leading-[18px]">
                    {thirdStepDescription}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row lg:flex-wrap gap-3">
                  <Link
                    target="_blank"
                    href={
                      "https://drive.google.com/file/d/1zzsC5_DDxMqcxFm0UkFwtqCVtDfdgVYy/view?pli=1"
                    }
                    className="bg-primary rounded-[8px] py-[6px] pr-[6px] pl-4 w-fit gap-[15px] flex items-center text-[14px] leading-[18px] font-medium text-white"
                  >
                    {thirdStepCTABTN1}
                    <span className="bg-primary-foreground rounded-[4px] h-9 aspect-square flex items-center justify-center">
                      <ArrowRight className="size-6 text-primary" />
                    </span>
                  </Link>
                  <Link
                    target="_blank"
                    href={
                      "https://drive.google.com/file/d/160Etgu0na29EpCpk1AJGnzAq9CqqssHo/view"
                    }
                    className="bg-primary rounded-[8px] py-[6px] pr-[6px] pl-4 w-fit gap-[15px] flex items-center text-[14px] leading-[18px] font-medium text-white"
                  >
                    {thirdStepCTABTN2}
                    <span className="bg-primary-foreground rounded-[4px] h-9 aspect-square flex items-center justify-center">
                      <ArrowRight className="size-6 text-primary" />
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          </li>
        </ul>

        {/* Mobile View */}
        <LazyMotion features={domAnimation}>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:hidden lg:items-center gap-4 w-full group">
            <li className="md:col-span-2">
              <article
                ref={firstcardRef}
                className="overflow-hidden relative w-full transition-all duration-300 ease-in-out aspect-[89/110] md:aspect-auto md:h-[420px] h-auto rounded-[12px] group/item"
              >
                <Image
                  src={"/assets/images/public/home/pmb-example-image.webp"}
                  fill
                  alt="PMB Example Image"
                  className="object-cover rounded-[12px]"
                />
                <m.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isInViewFirstCard ? 0 : 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-0 left-0 w-full h-full rounded-[12px] bg-gradient-to-t from-[#333333] to-transparent"
                />
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInViewFirstCard ? 0.8 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#333333CC] opacity-0 absolute top-0 left-0 w-full h-full rounded-[12px]"
                />
                <m.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isInViewFirstCard ? 0 : 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-0 left-0 w-full h-full flex flex-col justify-end gap-7 p-4 lg:p-7"
                >
                  <div className="flex flex-col gap-2 lg:gap-4">
                    <p className="text-[#F9F6F6] text-[16px] lg:text-[20px] font-medium leading-5 lg:leading-6">
                      {firstStep}
                    </p>
                    <p className="text-white text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] leading-6 lg:leading-8">
                      {firstStepTitle}
                    </p>
                  </div>
                </m.div>
                <m.div
                  initial={{ opacity: 0, y: 500 }}
                  animate={{
                    opacity: isInViewFirstCard ? 1 : 0,
                    y: isInViewFirstCard ? 0 : 500,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: isInViewFirstCard ? 0.3 : 0,
                  }}
                  className="absolute top-0 left-0 w-full h-full flex flex-col justify-end gap-7 p-4 lg:p-7"
                >
                  <div className="flex flex-col gap-2 lg:gap-4">
                    <p className="text-[#F9F6F6] text-[16px] lg:text-[20px] font-medium leading-5 lg:leading-6">
                      {firstStep}
                    </p>
                    <p className="text-white text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] leading-6 lg:leading-8">
                      {firstStepTitle}
                    </p>
                    <p className="text-[14px] text-[#F9F6F6] font-medium leading-[18px]">
                      {firstStepDescription}
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row lg:flex-wrap gap-3">
                    <Link
                      target="_blank"
                      href={"/scholarship-register"}
                      className="bg-primary rounded-[8px] py-[6px] pr-[6px] pl-4 w-fit gap-[15px] flex items-center text-[14px] leading-[18px] font-medium text-white"
                    >
                      {firstStepCTABTN1}
                      <span className="bg-primary-foreground rounded-[4px] h-9 aspect-square flex items-center justify-center">
                        <ArrowRight className="size-6 text-primary" />
                      </span>
                    </Link>
                    <Link
                      target="_blank"
                      href={"/pmb"}
                      className="bg-primary rounded-[8px] py-[6px] pr-[6px] pl-4 w-fit gap-[15px] flex items-center text-[14px] leading-[18px] font-medium text-white"
                    >
                      {firstStepCTABTN2}
                      <span className="bg-primary-foreground rounded-[4px] h-9 aspect-square flex items-center justify-center">
                        <ArrowRight className="size-6 text-primary" />
                      </span>
                    </Link>
                    {/* <Link
                      href={"/"}
                      className="bg-primary rounded-[8px] py-[6px] pr-[6px] pl-4 w-fit gap-[15px] flex items-center text-[14px] leading-[18px] font-medium text-white"
                    >
                      {firstStepCTABTN3}
                      <span className="bg-primary-foreground rounded-[4px] h-9 aspect-square flex items-center justify-center">
                        <ArrowRight className="size-6 text-primary" />
                      </span>
                    </Link> */}
                  </div>
                </m.div>
              </article>
            </li>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2 lg:col-auto w-full lg:h-[420px]">
              <li>
                <article
                  ref={secondCardRef}
                  className="overflow-hidden relative w-full aspect-[89/110] md:aspect-auto md:h-[420px] h-auto rounded-[12px]"
                >
                  <Image
                    src={"/assets/images/public/home/pmb-example-image.webp"}
                    fill
                    alt="PMB Example Image"
                    className="object-cover rounded-[12px]"
                  />
                  <m.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isInViewSecondCard ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 left-0 w-full h-full rounded-[12px] bg-gradient-to-t from-[#333333] to-transparent"
                  />
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isInViewSecondCard ? 0.8 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-[#333333CC] opacity-0 absolute top-0 left-0 w-full h-full rounded-[12px]"
                  />
                  <m.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isInViewSecondCard ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 left-0 w-full h-full flex flex-col justify-end gap-7 p-4 lg:p-7"
                  >
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <p className="text-[#F9F6F6] text-[16px] lg:text-[20px] font-medium leading-5 lg:leading-6">
                        {secondStep}
                      </p>
                      <p className="text-white text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] leading-6 lg:leading-8">
                        {secondStepTitle}
                      </p>
                    </div>
                  </m.div>
                  <m.div
                    initial={{ opacity: 0, y: 500 }}
                    animate={{
                      opacity: isInViewSecondCard ? 1 : 0,
                      y: isInViewSecondCard ? 0 : 500,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: isInViewSecondCard ? 0.3 : 0,
                    }}
                    className="absolute top-0 left-0 w-full h-full flex flex-col justify-end gap-7 p-4 lg:p-7"
                  >
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <p className="text-[#F9F6F6] text-[16px] lg:text-[20px] font-medium leading-5 lg:leading-6">
                        {secondStep}
                      </p>
                      <p className="text-white text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] leading-6 lg:leading-8">
                        {secondStepTitle}
                      </p>
                      <p className="text-[14px] text-[#F9F6F6] font-medium leading-[18px]">
                        {secondStepDescription}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row lg:flex-wrap gap-3">
                      <Link
                        target="_blank"
                        href={"/re-register"}
                        className="bg-primary rounded-[8px] py-[6px] pr-[6px] pl-4 w-fit gap-[15px] flex items-center text-[14px] leading-[18px] font-medium text-white"
                      >
                        {secondStepCTABTN1}
                        <span className="bg-primary-foreground rounded-[4px] h-9 aspect-square flex items-center justify-center">
                          <ArrowRight className="size-6 text-primary" />
                        </span>
                      </Link>
                    </div>
                  </m.div>
                </article>
              </li>
              <li>
                <article
                  ref={thirdCardRef}
                  className="overflow-hidden relative w-full aspect-[89/110] md:aspect-auto md:h-[420px] h-auto rounded-[12px]"
                >
                  <Image
                    src={"/assets/images/public/home/pmb-example-image.webp"}
                    fill
                    alt="PMB Example Image"
                    className="object-cover rounded-[12px]"
                  />
                  <m.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isInViewThirdCard ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 left-0 w-full h-full rounded-[12px] bg-gradient-to-t from-[#333333] to-transparent"
                  />
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isInViewThirdCard ? 0.8 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-[#333333CC] opacity-0 absolute top-0 left-0 w-full h-full rounded-[12px]"
                  />
                  <m.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isInViewThirdCard ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 left-0 w-full h-full flex flex-col justify-end gap-7 p-4 lg:p-7"
                  >
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <p className="text-[#F9F6F6] text-[16px] lg:text-[20px] font-medium leading-5 lg:leading-6">
                        {thirdStep}
                      </p>
                      <p className="text-white text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] leading-6 lg:leading-8">
                        {thirdStepTitle}
                      </p>
                    </div>
                  </m.div>
                  <m.div
                    initial={{ opacity: 0, y: 500 }}
                    animate={{
                      opacity: isInViewThirdCard ? 1 : 0,
                      y: isInViewThirdCard ? 0 : 500,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: isInViewThirdCard ? 0.3 : 0,
                    }}
                    className="absolute top-0 left-0 w-full h-full flex flex-col justify-end gap-7 p-4 lg:p-7"
                  >
                    <div className="flex flex-col gap-2 lg:gap-4">
                      <p className="text-[#F9F6F6] text-[16px] lg:text-[20px] font-medium leading-5 lg:leading-6">
                        {thirdStep}
                      </p>
                      <p className="text-white text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] leading-6 lg:leading-8">
                        {thirdStepTitle}
                      </p>
                      <p className="text-[14px] md:line-clamp-3 text-[#F9F6F6] font-medium leading-[18px]">
                        {thirdStepDescription}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row flex-wrap gap-3">
                      <Link
                        target="_blank"
                        href={
                          "https://drive.google.com/file/d/1zzsC5_DDxMqcxFm0UkFwtqCVtDfdgVYy/view?pli=1"
                        }
                        className="bg-primary rounded-[8px] py-[6px] pr-[6px] pl-4 w-fit gap-[15px] flex items-center text-[14px] leading-[18px] font-medium text-white"
                      >
                        {thirdStepCTABTN1}
                        <span className="bg-primary-foreground rounded-[4px] h-9 aspect-square flex items-center justify-center">
                          <ArrowRight className="size-6 text-primary" />
                        </span>
                      </Link>
                      <Link
                        target="_blank"
                        href={
                          "https://drive.google.com/file/d/160Etgu0na29EpCpk1AJGnzAq9CqqssHo/view"
                        }
                        className="bg-primary rounded-[8px] py-[6px] pr-[6px] pl-4 w-fit gap-[15px] flex items-center text-[14px] leading-[18px] font-medium text-white"
                      >
                        {thirdStepCTABTN2}
                        <span className="bg-primary-foreground rounded-[4px] h-9 aspect-square flex items-center justify-center">
                          <ArrowRight className="size-6 text-primary" />
                        </span>
                      </Link>
                      {/* <Link
                        href={"/"}
                        className="bg-primary rounded-[8px] py-[6px] pr-[6px] pl-4 w-fit gap-[15px] flex items-center text-[14px] leading-[18px] font-medium text-white"
                      >
                        {firstStepCTABTN3}
                        <span className="bg-primary-foreground rounded-[4px] h-9 aspect-square flex items-center justify-center">
                          <ArrowRight className="size-6 text-primary" />
                        </span>
                      </Link> */}
                    </div>
                  </m.div>
                </article>
              </li>
            </ul>
          </ul>
        </LazyMotion>
      </div>
    </section>
  );
};

export default NewStudentRegistrationProcedureSection;
