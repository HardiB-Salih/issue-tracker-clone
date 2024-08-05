"use client";

import { cn } from "@/lib/utils";
import { Bug } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const path = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="mb-5 flex h-14 items-center space-x-6 border-b px-5">
      <Link href="/">
        <Bug className="duration-400 size-7 animate-accordion-up fill-rose-700 stroke-red-900 repeat-[5]" />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className={cn(
              "transition-colors hover:text-zinc-800",
              path === link.href ? "active:text-zinc-900" : "text-zinc-500",
            )}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
