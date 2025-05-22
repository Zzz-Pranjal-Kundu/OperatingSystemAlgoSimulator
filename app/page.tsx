"use client";

import NavBar from "@/components/ui/NavBar";
import HyperText from "@/components/ui/hyper-text";
import Particles from "@/components/ui/particles";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Home() {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    <div className="relative min-h-screen">
      <NavBar />
      <Particles
        className="absolute inset-0 -z-10"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
      <main className="flex flex-col items-center justify-center p-10 space-y-6">
        {/* <HyperText
          className="text-4xl font-bold text-black dark:text-white text-center"
          text="ScheduloViz : Interactive Process and Desk Scheeduling Simulator"
        /> */}
        {/* <h1
          className="text-4xl font-bold text-black dark:text-white text-center">
            ScheduloViz : Interactive Process and Desk Scheduling Simulator
        </h1> */}
        {/* <h1 className="text-5xl font-extrabold text-center text-black dark:text-white my-6">
          <span className="text-indigo-500">ScheduloViz</span> <br />
          <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
            Interactive Process &amp; Disk Scheduling Simulator 
          </span>
        </h1> */}
        <h1 className="text-5xl font-extrabold text-center text-black dark:text-white my-8 tracking-wide">
          <span className="block text-indigo-500 drop-shadow-md">
            Schedulo<span className="text-pink-500">Viz</span>
          </span>
          <span className="mt-3 inline-block text-base sm:text-lg font-medium text-gray-600 dark:text-gray-300 italic">
            Interactive <span className="text-green-500">Process</span> &amp; <span className="text-blue-500">Disk Scheduling</span> Simulator
          </span>
        </h1>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/cpu"
            className="relative inline-block px-8 py-4 text-blue-200 bg-gray-900 border-4 border-green-400 rounded-sm font-arcade text-xs tracking-wider transition-all duration-300 hover:bg-green-300 hover:text-gray-900 active:scale-95 shadow-[0_0_6px_#93c5fd] hover:shadow-[0_0_12px_#93c5fd] before:absolute before:inset-0 before:border-4 before:border-dotted before:border-green-300 before:animate-ping before:rounded-sm before:opacity-10 overflow-hidden"
          >
            ▶ CPU SCHEDULING ◀
          </Link>

          <Link
            href="/disk"
            className="relative inline-block px-8 py-4 text-blue-200 bg-gray-900 border-4 border-blue-400 rounded-sm font-arcade text-xs tracking-wider transition-all duration-300 hover:bg-blue-300 hover:text-gray-900 active:scale-95 shadow-[0_0_6px_#93c5fd] hover:shadow-[0_0_12px_#93c5fd] before:absolute before:inset-0 before:border-4 before:border-dotted before:border-blue-300 before:animate-ping before:rounded-sm before:opacity-10 overflow-hidden"
          >
            ▶ Disk Scheduling ◀
          </Link>
          {/* <Link
            href="/page"
            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition text-center"
          >
            Page Replacement
          </Link>
          <Link
            href="/deadlock"
            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition text-center"
          >
            Deadlock Simulation
          </Link> */}
        </div>
      </main>
    </div>
  );
}
