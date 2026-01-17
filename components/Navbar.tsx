"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "About", href: "/about" },
  ];

  const [toggleDarkMode, setToggleDarkMode] = useState<boolean>(false);

  return (
    <nav className="bg-white sticky">
      <div className="mx-auto flex justify-evenly items-center rounded-4xl h-12 transition-colors duration-200">
        {/* Logo / App Name */}
        <Link href="/">
          <Logo size={24} className="" />
        </Link>

        {/* Nav Items */}
        <div className="flex items-center gap-12 font-[rubik]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  ${
                    isActive
                      ? "text-primary font-semibold transition-all [duration-250]"
                      : "text-black hover:text-primary transition-all duration-[250]"
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}

          <button className="cursor-pointer">
            {toggleDarkMode ? (
              <></>
            ) : (
              <MdOutlineDarkMode className="text-lg hover:text-primary transition-all duration-[250]" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
