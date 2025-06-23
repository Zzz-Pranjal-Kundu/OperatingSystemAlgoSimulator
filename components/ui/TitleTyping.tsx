"use client"

import { Cpu, HardDrive } from "lucide-react";
import { useState } from "react";

interface AnimatedTitleProps {
  content: string;
  icon?: "cpu" | "disk";
}

export default function AnimatedTitle({ content, icon = "cpu" }: AnimatedTitleProps) {
  const Icon = icon === "disk" ? HardDrive : Cpu;
  const iconColor = icon === "disk" ? "text-blue-400" : "text-green-400";
  const glow =
    icon === "disk"
      ? "drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]"
      : "drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]";

  const [animateKey, setAnimateKey] = useState(0);

  const handleHover = () => {
    setAnimateKey(0); // remove animation
    setTimeout(() => setAnimateKey(prev => prev + 1), 10); // retrigger
  };

  return (
    <div className="w-fit mx-auto mt-10 text-center group">
      <div
        className="flex items-center justify-center gap-3 mb-3"
        onMouseEnter={handleHover}
      >
        <Icon
          className={`${iconColor} ${glow} group-hover:rotate-6 group-hover:scale-110 transition-all duration-300`}
          size={40}
        />
        <div
          key={animateKey} // important to force DOM re-render
          className={`overflow-hidden border-r-2 border-white whitespace-nowrap text-xl sm:text-5xl font-bold text-white animate-typewriter`}
        >
          <span className={`${iconColor}`}>{content}...</span>{" "}
          <span className="text-neutral-300 italic"></span>
        </div>
        <span className="animate-blink ml-1 font-bold text-white text-3xl"></span>
      </div>
    </div>
  );
}
