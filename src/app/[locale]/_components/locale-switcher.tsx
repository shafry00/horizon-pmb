/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { LANGUAGES_ITEMS } from "@/constants";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";
import * as React from "react";

interface LocaleSwitcherProps {
  defaultLocale: string;
  isLocaleSwitcherOpen: boolean;
  setIsLocaleSwitcherOpen: (value: boolean) => void;
}

export default function LocaleSwitcher({
  defaultLocale,
  isLocaleSwitcherOpen,
  setIsLocaleSwitcherOpen,
}: LocaleSwitcherProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const pathname = usePathname();
  const switcherRef = React.useRef<HTMLDivElement>(null);

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsLocaleSwitcherOpen(!isLocaleSwitcherOpen);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        switcherRef.current &&
        !switcherRef.current.contains(event.target as Node)
      ) {
        setIsLocaleSwitcherOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setIsLocaleSwitcherOpen]);

  function onSelectChange(value: string) {
    startTransition(() => {
      router.replace({ pathname }, { locale: value as any });
    });
  }

  return (
    <div
      ref={switcherRef}
      className="relative w-fit z-[999] font-museoSans-300 p-1"
    >
      <button
        className="gap-1 w-full flex items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="flex items-center gap-1 lg:gap-2">
          <span className="text-black lg:text-[14px] font-bold lg:leading-[18px] uppercase">
            {defaultLocale}
          </span>
        </div>
      </button>
      <ul
        className={`absolute left-0 ${
          isLocaleSwitcherOpen
            ? "flex flex-col items-center md:gap-2"
            : "hidden"
        } bg-white text-gray-800 py-1 mt-4 w-full shadow-md`}
      >
        {LANGUAGES_ITEMS.map((item) => (
          <li
            key={item.code}
            className="hover:bg-[#EEE] w-fit cursor-pointer flex items-center justify-center"
            onClick={() => {
              onSelectChange(item.code);
              setIsLocaleSwitcherOpen(false);
            }}
          >
            <span className="uppercase w-full text-center">{item.code}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
