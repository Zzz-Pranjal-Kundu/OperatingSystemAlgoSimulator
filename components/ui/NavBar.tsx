"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // if you're using Tailwind + shadcn

export default function NavBar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    cn(
      "px-4 py-2 rounded-lg transition",
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
    );

  return (
    <nav className="w-full bg-white dark:bg-black shadow-md p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        ScheduloViz by VisualEyeZers
      </Link>
      <div className="flex space-x-4">
        <Link href="/" className={linkClass("/")}>
          Home
        </Link>
        <Link href="/cpu" className={linkClass("/cpu")}>
          CPU
        </Link>
        <Link href="/disk" className={linkClass("/disk")}>
          Disk
        </Link>
        {/* <Link href="/page" className={linkClass("/page")}>
          Page Replacement
        </Link>
        <Link href="/deadlock" className={linkClass("/deadlock")}>
          Deadlock
        </Link> */}
      </div>
    </nav>
  );
}
