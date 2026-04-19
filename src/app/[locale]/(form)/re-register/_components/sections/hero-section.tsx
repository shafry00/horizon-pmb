import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative">
      <div className="relative h-[100px] md:h-[19svh] lg:h-[50svh] 2xl:h-[45svh]">
        <div className="absolute w-full aspect-[668/165] rounded-[12px] ">
          <Image
            src={
              "/assets/images/public/re-register/homebanner-example-image.webp"
            }
            fill
            alt="Re Register Home Banner"
            className="rounded-[12px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
