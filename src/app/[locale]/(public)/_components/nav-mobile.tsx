"use client";

import * as React from "react";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { Link } from "@/i18n/navigation";

interface TNavMobileProps {
  showModal: boolean;
  toggleModal: () => void;
  menu: MenuItem[];
  t: (key: string) => string;
  pathname: string;
}

interface MenuItem {
  id: number;
  name: string;
  href: string;
}

const NavMobile: React.FC<TNavMobileProps> = (props) => {
  const { showModal, menu, t, pathname } = props;

  const modalVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        delay: 0.3,
      },
    },
  };

  const linkItemVariants: Variants = {
    hidden: { opacity: 0, y: "50%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: "50%",
      transition: {
        duration: 0.1,
        ease: "easeOut",
      },
    },
  };

  const navLinksVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 top-[80px] flex justify-center items-center w-full z-[99999] font-museoSans-500"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="absolute top-0 left-0 flex justify-center items-center w-full p-6 h-[90%]">
            <motion.nav
              className="relative w-full bg-primary rounded-[12px] h-full"
              variants={navLinksVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ul className="flex flex-col gap-8 items-center justify-center h-full ">
                {menu.map((item: MenuItem, index: number) => {
                  const isActive = pathname === item.href;

                  return (
                    <motion.li
                      variants={linkItemVariants}
                      key={index}
                      className="items-center flex flex-col gap-2"
                    >
                      <Link
                        href={item.href}
                        className={`text-white text-[18px] leading-[22px] font-medium ${
                          isActive && "underline"
                        }`}
                      >
                        {t(item.name)}
                      </Link>
                    </motion.li>
                  );
                })}
                {/* {menu.map((link, index) => (
                <motion.li
                  key={index}
                  className="text-white font-light text-2xl cursor-pointer"
                  variants={linkItemVariants}
                >
                  {t(link.label)}
                </motion.li>
              ))} */}
              </ul>
            </motion.nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavMobile;
