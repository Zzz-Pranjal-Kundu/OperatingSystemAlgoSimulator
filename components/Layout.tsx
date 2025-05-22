"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      <nav className="flex justify-center gap-4 py-4 shadow-md bg-gray-100">
        <Link
          href="/cpu"
          className={`px-4 py-2 rounded ${
            pathname === "/cpu"
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
        >
          CPU Scheduling
        </Link>
        <Link
          href="/disk"
          className={`px-4 py-2 rounded ${
            pathname === "/disk"
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
        >
          Disk Scheduling
        </Link>
      </nav>
      <main className="p-4">{children}</main>
    </div>
  );
}
