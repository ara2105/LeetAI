"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function NavContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const user = searchParams.get("user");

  const buildHref = (path: string) => {
    if (path === "/") return "/";
    return user ? `${path}?user=${user}` : path;
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: buildHref("/dashboard") },
    { name: "Roadmap", href: buildHref("/roadmap") },
  ];

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-black border-b border-zinc-900 sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-1">
        <span className="text-xl font-bold text-zinc-100">Leet</span>
        <span className="text-xl font-bold text-[#FFA116]">Ai</span>
      </Link>

      <div className="flex items-center gap-6">
        {navLinks.map((link) => {
          // Check if pathname matches since href contains query params
          const isActive = pathname === (link.href.split("?")[0] || "/");
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm tracking-wide transition-colors ${
                isActive
                  ? "text-zinc-100 font-medium px-3 py-1.5 bg-zinc-800/50 rounded-md"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={
      <nav className="flex items-center justify-between px-8 py-4 bg-black border-b border-zinc-900 sticky top-0 z-50">
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold text-zinc-100">Leet</span>
          <span className="text-xl font-bold text-[#FFA116]">Ai</span>
        </div>
      </nav>
    }>
      <NavContent />
    </Suspense>
  );
}
