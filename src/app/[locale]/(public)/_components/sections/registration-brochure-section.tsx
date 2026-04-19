import React from "react";
import SubTitleBadge from "../sub-title-badge";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface IRegistrationBrochureSectionProps {
  subTitle: string;
  title: string;
  brochureLabel1: string;
  brochureLabel2: string;
  brochureLabelDownload: string;
}

const RegistrationBrochureSection: React.FC<
  IRegistrationBrochureSectionProps
> = (props) => {
  const {
    subTitle,
    title,
    brochureLabel1,
    brochureLabel2,
    brochureLabelDownload,
  } = props;
  return (
    <section className="h-full">
      <div className="padding-x-global padding-y-global bg-[#F7F7F9] rounded-[20px] h-full border border-solid border-[#EAEAEA]">
        <div className="flex flex-col lg:justify-between gap-6 2xl:gap-20 w-full h-full">
          <div className="flex flex-col items-center gap-3">
            <SubTitleBadge subTitle={subTitle} />
            <h2 className="text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[48px] leading-9 md:leading-10 lg:leading-11 xl:leading-12 2xl:leading-[52px] text-[#121212] tracking-[-1px] text-center">
              {title}
            </h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="">
              <article className="relative w-full aspect-[5/6] lg:aspect-auto lg:h-[400px] 2xl:aspect-[15/23] 2xl:h-auto h-full rounded-[12px]">
                <Image
                  src={"/assets/images/public/home/brochure-1-image.webp"}
                  fill
                  alt="Brochure Image 1"
                  className="object-cover rounded-[12px]"
                />
                <div className="bg-gradient-to-t from-[#333333] to-transparent absolute top-0 left-0 w-full h-full rounded-[12px]" />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end gap-7 p-4 lg:p-7">
                  <p className="text-white text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] leading-6 lg:leading-8">
                    {brochureLabel1}
                  </p>
                  <Link
                    target="_blank"
                    href={"https://horizon.ac.id/id/brosur-dan-biaya-kuliah/"}
                    className="bg-primary rounded-[8px] py-[6px] pr-[6px] pl-4 w-fit gap-[15px] flex items-center text-[14px] leading-[18px] font-medium text-white"
                  >
                    {brochureLabelDownload}
                    <span className="bg-primary-foreground rounded-[4px] h-9 aspect-square flex items-center justify-center">
                      <ArrowRight className="size-6 text-primary" />
                    </span>
                  </Link>
                </div>
              </article>
            </li>
            <li>
              <article className="relative w-full aspect-[5/6] lg:aspect-auto lg:h-[400px] 2xl:aspect-[15/23] 2xl:h-auto h-full rounded-[12px]">
                <Image
                  src={"/assets/images/public/home/brochure-2-image.webp"}
                  fill
                  alt="Brochure Image 2"
                  className="object-cover rounded-[12px]"
                />
                <div className="bg-gradient-to-t from-[#333333] to-transparent absolute top-0 left-0 w-full h-full rounded-[12px]" />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end gap-7 p-4 lg:p-7">
                  <p className="text-white text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] leading-6 lg:leading-8">
                    {brochureLabel2}
                  </p>
                  <Link
                    target="_blank"
                    href={"https://horizon.ac.id/id/brosur-kelas-karyawan/"}
                    className="bg-primary rounded-[8px] py-[6px] pr-[6px] pl-4 w-fit gap-[15px] flex items-center text-[14px] leading-[18px] font-medium text-white"
                  >
                    {brochureLabelDownload}
                    <span className="bg-primary-foreground rounded-[4px] h-9 aspect-square flex items-center justify-center">
                      <ArrowRight className="size-6 text-primary" />
                    </span>
                  </Link>
                </div>
              </article>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RegistrationBrochureSection;
