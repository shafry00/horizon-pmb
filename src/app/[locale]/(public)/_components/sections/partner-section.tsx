import { Marquee } from "@/components/magicui/marquee";
import { PARTNER_ITEMS } from "@/constants";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import React from "react";

interface IPartnerSectionProps {
  heading: string;
}

const PartnerSection: React.FC<IPartnerSectionProps> = (props) => {
  const { heading } = props;
  return (
    <section
      id="homepage-partner-section"
      className="py-4 md:py-[22px] lg:py-7 xl:py-[34px] 2xl:py-10"
    >
      <div className="flex flex-col gap-3 md:gap-[19px] lg:gap-[26px] xl:gap-[33px] 2xl:gap-10 justify-center">
        <div className="padding-x-global">
          <p className="font-medium text-[14px] lg:text-[16px] leading-[18px] lg:leading-5 text-[#A3A3A3] lg:text-black text-center">
            {heading}
          </p>
        </div>
        <Marquee className="[--duration:20s]">
          {PARTNER_ITEMS.map((partner) => (
            <Link
              key={`${partner.id}-${partner.alt}`}
              href={partner.link}
              className="p-4"
            >
              <div className={`relative w-[152px] h-[75px]`}>
                <Image
                  src={partner.logo}
                  alt={partner.alt}
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default PartnerSection;
