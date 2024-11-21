"use client";

import { AiFillBug } from "react-icons/ai";
// rafce
import Link from "next/link";
import classnames from "classnames";
import { usePathname } from "next/navigation";

const Links = [
  {
    href: "/",
    label: "Dashboard",
  },
  {
    href: "/issues",
    label: "Issues",
  },
];

const NavBar = () => {
  const currentPath = usePathname();

  return (
    <nav className="mb-5 flex items-center space-x-8 border-b-2 px-5 py-2">
      <Link
        className="border-2 border-transparent p-2 outline-none focus-visible:border-black"
        href="/"
        area-label="dashboard"
      >
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {Links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={classnames({
              "text-slate-900": href === currentPath,
              "text-slate-500": href !== currentPath,
              "border-2 border-transparent p-4 outline-none transition-colors hover:text-slate-900 focus-visible:border-black":
                true,
            })}
          >
            {label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
