"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";

export default function Navbar() {
  const pathname = usePathname();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "About", href: "/about" },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-300">
      <div className="mx-auto px-4 md:px-8 flex justify-between md:justify-evenly items-center h-16">
        {/* Logo */}
        <Link href="/" onClick={() => setIsHamburgerOpen(false)}>
          <Logo size={24} />
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-12 font-[rubik]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-black hover:text-primary"
                  }
                  transition-all duration-250
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-black transition-all duration-300 ${
              isHamburgerOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-black transition-all duration-300 ${
              isHamburgerOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-black transition-all duration-300 ${
              isHamburgerOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isHamburgerOpen ? "max-h-60 border-b" : "max-h-0"}
        `}
      >
        <div className="flex flex-col gap-4 p-4 bg-white font-[rubik]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsHamburgerOpen(false)}
                className={`
                  ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-black hover:text-primary"
                  }
                  transition-all duration-250 py-2
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
