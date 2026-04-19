import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section
      id="scholarship-list-page-hero-section"
      className="padding-x-global padding-y-global"
    >
      <div className="relative w-full aspect-[2.47/1] ">
        <Image
          src={
            "/assets/images/public/scholarship-list/scholarship-registration-banner-image.webp"
          }
          fill
          alt="Scholarship List Banner"
          className="object-cover rounded-[20px]"
        />
      </div>
    </section>
  );
};

export default HeroSection;
