/* eslint-disable @typescript-eslint/no-explicit-any */
import { FOOTER_MENU_ITEMS, SOCIAL_MEDIA_ITEMS } from "@/constants";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const Footer = () => {
  const t = useTranslations("PAGE.PUBLIC.FOOTER");

  return (
    <footer className="p-3 w-full mx-auto">
      <div className="rounded-[20px] bg-primary py-6 px-4 flex flex-col gap-6 relative overflow-hidden">
        <div className="absolute -bottom-72 md:-bottom-[500px] lg:-bottom-[300px] xl:-bottom-[350px] 2xl:-bottom-[670px] left-1/2 -translate-x-1/2 w-[839.054px] md:w-[1059.054px] h-[744.136px] md:h-[964.136px] lg:w-[1665.516px] lg:h-[542.826px] 2xl:w-[2065.516px] 2xl:h-[942.826px] min-[2048]:w-[2265.516px] min-[2048]:h-[1142.826px]">
          <Image
            src={"/assets/shapes/shape-1-mobile.svg"}
            alt="Shape 1"
            fill
            className="lg:hidden"
          />
          <Image
            src={"/assets/shapes/shape-1-desktop.svg"}
            alt="Shape 1"
            fill
            className="hidden lg:block"
          />
        </div>
        <nav className="flex flex-col lg:flex-row lg:justify-between gap-6 items-center relative z-10">
          <Link href={"/"} className="relative w-[279.08px] h-10">
            <Image
              src={"/assets/logo/horizon-univ-with-text-logo.webp"}
              alt="Horizon University Indonesia Icon"
              fill
            />
          </Link>
          <ul className="flex flex-col lg:flex-row gap-3 lg:gap-5 items-center">
            {FOOTER_MENU_ITEMS.map((menu) => (
              <li key={`${menu.id}-${menu.name}`}>
                <Link
                  href={menu.href}
                  className="text-[14px] leading-[18px] text-white font-medium text-center"
                >
                  {t(menu.name as any)}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex items-center gap-6 ">
            {SOCIAL_MEDIA_ITEMS.map((socmed) => (
              <li key={`${socmed.id}-${socmed.label}`}>
                <Link
                  href={socmed.href}
                  className="relative w-5 min-w-5 h-5 lg:w-6 lg:min-w-6 lg:h-6"
                >
                  <div className="relative w-5 min-w-5 h-5 lg:w-6 lg:min-w-6 lg:h-6">
                    <Image
                      src={socmed.icon}
                      alt={`${socmed.label} Icon`}
                      fill
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-3 items-center lg:flex-row lg:justify-between relative z-20">
          <ul className="flex items-center justify-between md:justify-normal gap-4 lg:gap-[30px]">
            <li className="text-[14px] lg:text-[16px] leading-[18px] lg:leading-5 text-white">
              email:{" "}
              <Link
                href="mailto:info.krw@horizon.ac.id"
                className="hover:underline"
              >
                info.krw@horizon.ac.id
              </Link>
            </li>
            <li className="text-[14px] lg:text-[16px] leading-[18px] lg:leading-5 text-white">
              website:{" "}
              <Link
                target="_blank"
                href="https://horizon.ac.id"
                className="hover:underline"
              >
                horizon.ac.id
              </Link>
            </li>
          </ul>
          <p className="text-[14px] leading-[18px] text-white lg:text-[16px] lg:leading-normal text-center">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
