import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative">
      <div className="relative w-full aspect-[2.47/1]">
        <Image
          src={"/assets/images/public/pmb/home-banner.webp"}
          fill
          alt="PMB Home Banner"
          className="rounded-[20px] object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSection;
