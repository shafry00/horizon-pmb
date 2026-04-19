/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Menu, XIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { HEADER_MENU_ITEMS } from "@/constants";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
// import { useLocale } from "next-intl";
import dynamic from "next/dynamic";
import { useHeaderVisibilityStore } from "@/stores/use-header-visibility-store";
// import LocaleSwitcher from "../../_components/locale-switcher";

const NavMobile = dynamic(() => import("./nav-mobile"), {
  ssr: false,
});

const Header = () => {
  const t = useTranslations("GLOBAL.HEADER.MENU");
  const pathname = usePathname();
  const [showNavMobile, setShowNavMobile] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("");
  const hideHeader = useHeaderVisibilityStore((state) => state.hideHeader);
  // const [isLanguageSwitcherOpen, setIsLanguageSwitcherOpen] =
  //   React.useState(false);

  // const locale = useLocale();
  const toggleModal = () => {
    setShowNavMobile(!showNavMobile);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      let found = false;

      for (const item of HEADER_MENU_ITEMS) {
        const section = document.querySelector(item.href);
        if (!section) continue;

        const top = section.getBoundingClientRect().top + window.scrollY;
        const bottom = top + section.clientHeight;

        if (scrollY >= top - 100 && scrollY < bottom - 100) {
          setActiveSection(item.href);
          found = true;
          break;
        }
      }

      if (!found) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: hideHeader ? 0 : 1, y: hideHeader ? -30 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ pointerEvents: hideHeader ? "none" : "auto" }}
        className="fixed top-0 left-0 w-full p-6 z-[9999]"
      >
        <div className="bg-primary p-3 rounded-[12px] flex items-center justify-between">
          <Link
            href={"/"}
            className="relative w-10 h-10 lg:h-11 xl:w-[306.988px]"
          >
            <Image
              src={"/assets/logo/horizon-univ-without-text-logo.svg"}
              fill
              alt="Horizon University Indonesia Logo"
              priority
              className="xl:hidden"
            />
            <Image
              src={"/assets/logo/horizon-univ-with-text-logo.webp"}
              fill
              alt="Horizon University Indonesia Logo"
              priority
              className="hidden xl:block"
            />
          </Link>
          <nav className="hidden xl:flex items-center gap-3">
            <ul className="flex items-center gap-5 bg-primary-foreground py-4 px-5 rounded-[8px]">
              {HEADER_MENU_ITEMS.map((menu) => {
                const isActive = activeSection === menu.href;

                return (
                  <li key={menu.id} className="relative">
                    <Link
                      href={menu.href}
                      className="relative text-primary text-[14px] leading-[18px] font-medium px-1"
                    >
                      {t(menu.name as any)}
                      {isActive && (
                        <motion.div
                          layoutId="underline"
                          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="bg-primary-foreground px-4 py-4  rounded-[8px] flex items-center">
              <Link href={"/pmb"} target="_blank">
                {t("menu-5")}
              </Link>
            </div>
            {/* <div className="bg-primary-foreground px-4 py-4 rounded-[8px] flex items-center">
              <LocaleSwitcher
                isLocaleSwitcherOpen={isLanguageSwitcherOpen}
                setIsLocaleSwitcherOpen={setIsLanguageSwitcherOpen}
                defaultLocale={locale}
              />
            </div> */}
          </nav>

          <Button
            onClick={toggleModal}
            className="xl:hidden"
            aria-label={showNavMobile ? "Tutup navigasi" : "Buka navigasi"}
          >
            {showNavMobile ? (
              <XIcon className="text-primary-foreground size-10" />
            ) : (
              <Menu className="text-primary-foreground size-10" />
            )}
          </Button>
        </div>
      </motion.header>
      <NavMobile
        t={t as any}
        pathname={pathname}
        menu={HEADER_MENU_ITEMS}
        showModal={showNavMobile}
        toggleModal={toggleModal}
      />
    </>
  );
};

export default Header;
