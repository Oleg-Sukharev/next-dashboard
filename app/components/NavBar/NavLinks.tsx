"use client";

import { navLinks, NavLink } from "@/app/constants/navLinks";
import mc from "@/utils/mergeClasses";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const currentPath = usePathname();

  return (
    <ul className="flex space-x-6">
      {navLinks.map((link: NavLink) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={mc(
              "nav-link",
              link.href === currentPath && "!text-zinc-900",
            )}
          >
            {link.label}
          </Link>
        </li>
      ))
      }
    </ul>
  );
};

export default NavLinks;