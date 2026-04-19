/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";
import React from "react";
import SubTitleBadge from "../sub-title-badge";

interface IStudentOpinionSectionProps {
  subHeading: string;
  heading: string;
}

const StudentOpinionSection: React.FC<IStudentOpinionSectionProps> = (
  props
) => {
  const { subHeading, heading } = props;
  return (
    <section className="p-3">
      <div className="flex flex-col rounded-[20px] bg-[#F7F7F9]">
        <div className="padding-x-global padding-y-global flex flex-col gap-4 md:gap-[19px] lg:gap-[22px] xl:gap-[25px] 2xl:gap-7 items-center">
          <SubTitleBadge subTitle={subHeading} />
          <div
            className="text-center text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[48px] leading-9 md:leading-10 lg:leading-11 xl:leading-12 2xl:leading-13 tracking-[-1px]"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
        </div>
        {/* Mobile */}
        <div className="grid grid-cols-1 gap-4 padding-x-global padding-y-global lg:hidden">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-6 bg-primary-foreground rounded-[12px]">
              <div className="relative aspect-square rounded-[12px]">
                <Image
                  src={
                    "/assets/images/public/home/student-opinion-1-image.webp"
                  }
                  alt="Student Opinion Example Image"
                  fill
                  className="object-cover rounded-[12px]"
                />
              </div>
              <div className="px-4 pb-4">
                <blockquote className="text-[16px] leading-5 text-black flex flex-col gap-4">
                  "This financial technology AI solution revolutionized our
                  operations."
                  <cite className="not-italic">
                    Stephanie Liem,{" "}
                    <span className="opacity-[0.64]">S1 Manajemen</span>
                  </cite>
                </blockquote>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-[12px] bg-[#FFE1E4] h-[240px]">
                <blockquote className="text-[16px] leading-5 text-black flex flex-col justify-between h-full">
                  "This fintech AI platform transformed our work. Its features
                  improve efficiency!"
                  <cite className="not-italic">
                    Stephanie Liem,{" "}
                    <span className="opacity-[0.64]">S1 Manajemen</span>
                  </cite>
                </blockquote>
              </div>
              <div className="p-4 rounded-[12px] bg-primary h-[240px]">
                <blockquote className="text-[16px] leading-5 text-primary-foreground flex flex-col justify-between h-full">
                  "This fintech AI platform transformed our work. Its features
                  improve efficiency!"
                  <cite className="not-italic">
                    Stephanie Liem,{" "}
                    <span className="opacity-[0.64]">S1 Manajemen</span>
                  </cite>
                </blockquote>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-[12px] bg-[#FFE1E4] h-[156px]">
              <blockquote className="text-[16px] leading-5 text-black flex flex-col justify-between h-full">
                "This fintech AI platform transformed our work. Its features
                improve efficiency!"
                <cite className="not-italic">
                  Stephanie Liem,{" "}
                  <span className="opacity-[0.64]">S1 Akuntansi</span>
                </cite>
              </blockquote>
            </div>
            <div className="flex flex-col gap-6 bg-primary-foreground rounded-[12px]">
              <div className="relative aspect-square rounded-[12px]">
                <Image
                  src={
                    "/assets/images/public/home/student-opinion-2-image.webp"
                  }
                  alt="Student Opinion Example Image"
                  fill
                  className="object-cover rounded-[12px]"
                />
              </div>
              <div className="px-4 pb-4">
                <blockquote className="text-[16px] leading-5 text-black flex flex-col gap-4">
                  "This financial technology AI solution revolutionized our
                  operations."
                  <cite className="not-italic">
                    Stephanie Liem,{" "}
                    <span className="opacity-[0.64]">S1 Manajemen</span>
                  </cite>
                </blockquote>
              </div>
            </div>
            <div className="p-4 rounded-[12px] bg-primary h-[156px]">
              <blockquote className="text-[16px] leading-5 text-primary-foreground flex flex-col justify-between h-full">
                "This fintech AI platform transformed our work. Its features
                improve efficiency!"
                <cite className="not-italic">
                  Stephanie Liem,{" "}
                  <span className="opacity-[0.64]">S1 Manajemen</span>
                </cite>
              </blockquote>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-[12px] bg-[#FFE1E4] h-[240px]">
                <blockquote className="text-[16px] leading-5 text-black flex flex-col justify-between h-full">
                  "This fintech AI platform transformed our work. Its features
                  improve efficiency!"
                  <cite className="not-italic">
                    Stephanie Liem,{" "}
                    <span className="opacity-[0.64]">S1 Manajemen</span>
                  </cite>
                </blockquote>
              </div>
              <div className="p-4 rounded-[12px] bg-primary h-[240px]">
                <blockquote className="text-[16px] leading-5 text-primary-foreground flex flex-col justify-between h-full">
                  "This fintech AI platform transformed our work. Its features
                  improve efficiency!"
                  <cite className="not-italic">
                    Stephanie Liem,{" "}
                    <span className="opacity-[0.64]">S1 Manajemen</span>
                  </cite>
                </blockquote>
              </div>
            </div>
            <div className="flex flex-col gap-6 bg-primary-foreground rounded-[12px]">
              <div className="relative aspect-square rounded-[12px]">
                <Image
                  src={
                    "/assets/images/public/home/student-opinion-3-image.webp"
                  }
                  alt="Student Opinion Example Image"
                  fill
                  className="object-cover rounded-[12px]"
                />
              </div>
              <div className="px-4 pb-4">
                <blockquote className="text-[16px] leading-5 text-black flex flex-col gap-4">
                  "This financial technology AI solution revolutionized our
                  operations."
                  <cite className="not-italic">
                    Stephanie Liem,{" "}
                    <span className="opacity-[0.64]">S1 Manajemen</span>
                  </cite>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="lg:grid grid-cols-1 gap-4 hidden w-full">
          {/* First Row */}
          <div className="gap-4 flex w-full">
            <div className="flex w-full basis-[60%] flex-row gap-6 bg-primary-foreground rounded-[12px]">
              <div className="relative basis-[55%] aspect-square rounded-[12px]">
                <Image
                  src={
                    "/assets/images/public/home/student-opinion-1-image.webp"
                  }
                  alt="Student Opinion Example Image"
                  fill
                  className="object-cover rounded-[12px]"
                />
              </div>
              <div className="px-4 pb-4 basis-auto w-full flex items-center">
                <blockquote className="text-[20px] leading-6 gap-5 text-black flex flex-col">
                  "This financial technology AI solution revolutionized our
                  operations."
                  <cite className="not-italic">
                    Stephanie Liem,{" "}
                    <span className="opacity-[0.64]">S1 Manajemen</span>
                  </cite>
                </blockquote>
              </div>
            </div>
            <div className="p-4 rounded-[12px] basis-[20%] bg-[#FFE1E4] w-full">
              <blockquote className="text-[20px] leading-6 gap-5 text-black flex flex-col h-full justify-between">
                "This fintech AI platform transformed our work. Its features
                improve efficiency!"
                <cite className="not-italic">
                  Stephanie Liem,{" "}
                  <span className="opacity-[0.64]">S1 Manajemen</span>
                </cite>
              </blockquote>
            </div>
            <div className="p-4 rounded-[12px] basis-[20%] bg-primary w-full">
              <blockquote className="text-[20px] leading-6 gap-5 text-primary-foreground flex flex-col h-full justify-between">
                "This fintech AI platform transformed our work. Its features
                improve efficiency!"
                <cite className="not-italic">
                  Stephanie Liem,{" "}
                  <span className="opacity-[0.64]">S1 Manajemen</span>
                </cite>
              </blockquote>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex gap-4">
            <div className="p-4 rounded-[12px] basis-[20%] bg-[#FFE1E4]  w-full">
              <blockquote className="text-[20px] leading-6 gap-5 text-black flex flex-col h-full justify-between">
                "This fintech AI platform transformed our work. Its features
                improve efficiency!"
                <cite className="not-italic">
                  Stephanie Liem,{" "}
                  <span className="opacity-[0.64]">S1 Manajemen</span>
                </cite>
              </blockquote>
            </div>
            <div className="flex basis-[60%] w-full flex-row gap-6 bg-primary-foreground rounded-[12px]">
              <div className="relative aspect-square basis-[55%] rounded-[12px]">
                <Image
                  src={
                    "/assets/images/public/home/student-opinion-2-image.webp"
                  }
                  alt="Student Opinion Example Image"
                  fill
                  className="object-cover rounded-[12px]"
                />
              </div>
              <div className="px-4 pb-4 w-full basis-auto flex items-center">
                <blockquote className="text-[20px] leading-6 gap-5 text-black flex flex-col">
                  "This financial technology AI solution revolutionized our
                  operations."
                  <cite className="not-italic">
                    Stephanie Liem,{" "}
                    <span className="opacity-[0.64]">S1 Manajemen</span>
                  </cite>
                </blockquote>
              </div>
            </div>

            <div className="p-4 rounded-[12px] basis-[20%] bg-primary w-full">
              <blockquote className="text-[16px] leading-5 text-primary-foreground flex flex-col justify-between h-full">
                "This fintech AI platform transformed our work. Its features
                improve efficiency!"
                <cite className="not-italic">
                  Stephanie Liem,{" "}
                  <span className="opacity-[0.64]">S1 Manajemen</span>
                </cite>
              </blockquote>
            </div>
          </div>

          {/* Third Row */}
          <div className="flex gap-4 w-full">
            <div className="p-4 rounded-[12px] bg-[#FFE1E4] basis-[20%] w-full">
              <blockquote className="text-[20px] leading-6 gap-5 text-black flex flex-col h-full justify-between">
                "This fintech AI platform transformed our work. Its features
                improve efficiency!"
                <cite className="not-italic">
                  Stephanie Liem,{" "}
                  <span className="opacity-[0.64]">S1 Manajemen</span>
                </cite>
              </blockquote>
            </div>
            <div className="p-4 rounded-[12px] basis-[20%] bg-primary">
              <blockquote className="text-[20px] leading-6 gap-5 text-primary-foreground flex flex-col h-full justify-between">
                "This fintech AI platform transformed our work. Its features
                improve efficiency!"
                <cite className="not-italic">
                  Stephanie Liem,{" "}
                  <span className="opacity-[0.64]">S1 Manajemen</span>
                </cite>
              </blockquote>
            </div>
            <div className="basis-[60%] flex flex-row gap-6 bg-primary-foreground rounded-[12px] w-full">
              <div className="relative basis-[55%] aspect-square rounded-[12px]">
                <Image
                  src={
                    "/assets/images/public/home/student-opinion-3-image.webp"
                  }
                  alt="Student Opinion Example Image"
                  fill
                  className="object-cover rounded-[12px]"
                />
              </div>
              <div className="px-4 pb-4 w-full basis-auto flex items-center">
                <blockquote className="text-[20px] leading-6 gap-5 text-black flex flex-col">
                  "This financial technology AI solution revolutionized our
                  operations."
                  <cite className="not-italic">
                    Stephanie Liem,{" "}
                    <span className="opacity-[0.64]">S1 Manajemen</span>
                  </cite>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentOpinionSection;
