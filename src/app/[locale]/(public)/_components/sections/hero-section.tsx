"use client";

import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion, useInView } from "framer-motion";

interface IHeroSectionProps {
  heading: string;
  body: string;
  ctaButtonLabel1: string;
  ctaButtonLabel2: string;
  ctaButtonLabel3: string;
}

const HeroSection: React.FC<IHeroSectionProps> = (props) => {
  const { heading, body, ctaButtonLabel1, ctaButtonLabel2, ctaButtonLabel3 } =
    props;

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="p-3 w-full h-screen lg:aspect-[16/9] relative overflow-hidden"
    >
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-full h-full"
      >
        <Image
          src={"/assets/images/public/home/hero-banner-image.webp"}
          fill
          alt="Hero Home Banner"
          className="object-cover object-[80%] lg:object-[100%] rounded-[20px]"
          priority
        />
        <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0)_30.56%,rgba(255,255,255,0.5)_51.11%,#fff_96.24%)] absolute top-0 left-0 w-full h-full" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-0 left-0 w-full h-full flex items-end p-4 md:p-6 lg:p-8 xl:p-10"
        >
          <article className="flex flex-col gap-5 lg:gap-7 font-medium lg:max-w-[80%] xl:max-w-[70%] 2xl:max-w-[55%]">
            <div className="flex-col gap-2 hidden">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-primary text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] 2xl:text-[72px] 2xl:leading-[76px] leading-11 md:leading-[52px] lg:leading-[60px] xl:leading-[68px]"
              >
                {heading}
              </motion.h1>
              <p className="text-[14px] lg:text-[16px] 2xl:text-[18px] leading-[18px] lg:leading-5 2xl:leading-[22px] text-black">
                {body}
              </p>
            </div>
            <ul className="flex flex-col lg:flex-row gap-4 group">
              <li>
                <Link
                  href="/pmb"
                  target="_blank"
                  className="bg-primary border border-primary rounded-[8px] py-[6px] pr-[6px] pl-4 w-fit gap-[15px] flex items-center text-[14px] leading-[18px] font-medium text-white hover:bg-primary hover:text-white group-hover:bg-primary-foreground group-hover:text-primary transition-all duration-300 group/item"
                >
                  {ctaButtonLabel1}
                  <span className="bg-primary-foreground rounded-[4px] h-9 aspect-square group-hover/item:bg-primary-foreground flex items-center justify-center group-hover:bg-primary transition-all duration-300 ">
                    <ArrowRight className="size-6 text-primary group-hover/item:text-primary group-hover:text-white transition-all duration-300" />
                  </span>
                </Link>
              </li>

              <li className="hover:[&~li>Link]:bg-primary-foreground hover:[&~li>Link]:text-primary">
                <Link
                  href="/scholarship-register"
                  target="_blank"
                  className="bg-primary-foreground group/item border-primary border border-solid rounded-[8px] py-[6px] pr-[6px] pl-4 w-fit gap-[15px] flex items-center text-[14px] leading-[18px] font-medium text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  {ctaButtonLabel2}
                  <span className="bg-primary rounded-[4px] group-hover/item:bg-primary-foreground h-9 aspect-square flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                    <ArrowRight className="group-hover/item:text-primary size-6 text-white group-hover:text-primary-foreground transition-all duration-300" />
                  </span>
                </Link>
              </li>

              <li className="hover:[&~li>Link]:bg-primary-foreground hover:[&~li>Link]:text-primary">
                <Link
                  href="/re-register"
                  target="_blank"
                  className="bg-primary-foreground group/item group-hover:bg-primary-foreground border-primary border border-solid rounded-[8px] py-[6px] pr-[6px] pl-4 w-fit gap-[15px] flex items-center text-[14px] leading-[18px] font-medium text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  {ctaButtonLabel3}
                  <span className="bg-primary rounded-[4px] h-9 group-hover/item:bg-primary-foreground group-hover:bg-primary aspect-square flex items-center justify-center transition-all duration-300">
                    <ArrowRight className="size-6 text-white group-hover:text-primary-foreground transition-all duration-300 group-hover/item:text-primary " />
                  </span>
                </Link>
              </li>
            </ul>
          </article>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
