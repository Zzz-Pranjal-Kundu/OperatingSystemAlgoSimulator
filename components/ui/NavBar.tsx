"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CpuIcon, HardDriveIcon, HomeIcon } from "lucide-react";

export default function NavBar() {
  const pathname = usePathname();

  const navLink = (
    href: string,
    label: string,
    Icon: React.ElementType,
    borderColor: string,
    activeColor: string
  ) =>
    cn(
      "relative inline-flex items-center gap-2 px-4 py-2 text-blue-200 bg-gray-900 border-2 rounded-sm font-arcade text-xs tracking-wider transition-all duration-300 overflow-hidden",
      `border-${borderColor}`,
      `before:border-${borderColor}`,
      `hover:bg-${borderColor}-300 hover:text-gray-900`,
      "active:scale-95 shadow-[0_0_6px_#93c5fd] hover:shadow-[0_0_12px_#93c5fd]",
      "before:absolute before:inset-0 before:border-2 before:border-dotted before:animate-ping before:rounded-sm before:opacity-10",
      pathname === href && `bg-${activeColor}-500 text-white`
    );

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-lg bg-white/60 dark:bg-black/50 border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="relative inline-block font-arcade text-sm sm:text-lg px-4 py-2 text-blue-200 bg-gray-900 border-2 border-purple-400 rounded-sm tracking-wider shadow-[0_0_6px_#f472b6] hover:shadow-[0_0_12px_#f472b6] before:absolute before:inset-0 before:border-2 before:border-dotted before:border-pink-300 before:animate-ping before:rounded-sm before:opacity-10 overflow-hidden"
        >
          ✦ Schedulo<span className="text-pink-400">Viz</span> ✦
        </Link>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <Link
            href="/"
            className={navLink("/", "Home", HomeIcon, "indigo-400", "indigo")}
          >
            <HomeIcon size={16} />
            ▶ Home ◀
          </Link>

          <Link
            href="/cpu"
            className={navLink("/cpu", "CPU", CpuIcon, "green-400", "green")}
          >
            <CpuIcon size={16} />
            ▶ CPU ◀
          </Link>

          <Link
            href="/disk"
            className={navLink("/disk", "Disk", HardDriveIcon, "blue-400", "blue")}
          >
            <HardDriveIcon size={16} />
            ▶ Disk ◀
          </Link>
        </div>
      </div>
    </nav>
  );
}
