"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Tasks", href: "/tasks" },
    { label: "About", href: "/about" },
  ];

  return (
    <nav className="">
      <div className="mx-auto flex justify-around items-center rounded-4xl h-12 hover:bg-black/10 transition-colors duration-200">
        {/* Logo / App Name */}
        <Link href="/" className="text-xl font-[poppins]">
          TaskCodex
        </Link>

        {/* Nav Items */}
        <div className="flex items-center gap-12 font-[rubik]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? "text-[#1976D2] font-semibold"
                    : "text-black hover:text-[#427ab1] transition-colors"
                }
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
