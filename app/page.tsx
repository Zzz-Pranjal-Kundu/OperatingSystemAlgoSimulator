"use client";

import NavBar from "@/components/ui/NavBar";
import Particles from "@/components/ui/particles";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, HardDrive, Info, SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");
  const [showCPU, setShowCPU] = useState(false);
  const [showDisk, setShowDisk] = useState(false);

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  const floatCard = {
    whileHover: {
      y: -5,
      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      transition: { duration: 0.3 },
    },
  };

  const cpuDescriptions: Record<string, string> = {
    FCFS: `First-Come-First-Serve (FCFS) is the simplest scheduling algorithm. Processes are executed in the order they arrive.
Pros: Simple to implement; fair in terms of arrival time.
Cons: May lead to long average waiting time due to the "convoy effect".`,
    SJF: `Shortest Job First (SJF) executes processes with the shortest burst time first.
Pros: Minimizes average waiting time.
Cons: Can lead to starvation of longer processes; difficult to predict job lengths.`,
    "Round Robin": `Round Robin assigns a fixed time quantum and cycles through processes.
Pros: Fair sharing of CPU time; good for time-sharing systems.
Cons: Context switching overhead; performance depends on time quantum.`,
    Priority: `Priority Scheduling assigns each process a priority, executing higher priority ones first.
Pros: Allows important processes to run earlier.
Cons: Can cause starvation for low-priority processes unless aging is implemented.`,
  };

  const diskDescriptions: Record<string, string> = {
    FCFS: `FCFS serves disk requests in the order they arrive.
Pros: Fair and simple to implement.
Cons: High average seek time; not efficient for heavy loads.`,
    SSTF: `Shortest Seek Time First selects the request closest to the current head position.
Pros: Reduces seek time significantly.
Cons: May cause starvation of far requests.`,
    SCAN: `SCAN (Elevator algorithm) moves the head in one direction, servicing requests, then reverses.
Pros: Efficient and fair; reduces long seek times.
Cons: Slightly more complex than FCFS and SSTF.`,
    LOOK: `LOOK is similar to SCAN but the head only goes as far as the last request in each direction.
Pros: More efficient than SCAN by avoiding unnecessary traversal.
Cons: May still have slight starvation issues.`,
  };

  const cpuFormulae = `
Completion Time (CT) = Time at which process completes execution
Turnaround Time (TAT) = CT - Arrival Time
Waiting Time (WT) = TAT - Burst Time
Response Time (RT) = First Response Time - Arrival Time
Throughput = Number of processes completed / Total Time
CPU Efficiency = CPU Active Time / Total Time
`;

  const diskFormulae = `
Total Head Movement = Sum of all seek distances
Total Seek Time = Total Head Movement * Seek Time per Unit
Average Seek Time = Total Seek Time / Number of Requests
`;

  return (
    <div className="relative min-h-screen bg-[rgba(255,255,255,0.6)] dark:bg-[rgba(20,20,30,0.6)] backdrop-blur-xl">
      <NavBar />
      <Particles
        className="absolute inset-0 -z-10"
        quantity={120}
        ease={80}
        color={color}
        refresh
      />

      <main className="flex flex-col items-center justify-center px-6 py-10 space-y-10 overflow-x-hidden">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center font-sans leading-snug tracking-tight"
        >
          {/* Main Title */}
          <span className="block text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-400 to-purple-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
            Schedulo<span className="text-pink-400">Viz</span>
          </span>

          {/* Subtitle with icons */}
          <span className="mt-4 block text-lg sm:text-xl font-light text-neutral-700 dark:text-neutral-300 italic">
            Interactive{" "}
            <span className="inline-flex items-center gap-1 text-green-500 font-medium">
              <Cpu size={18} className="inline-block" />
              Process
            </span>{" "}
            &amp;{" "}
            <span className="inline-flex items-center gap-1 text-blue-400 font-medium">
              <HardDrive size={18} className="inline-block" />
              Disk Scheduling
            </span>{" "}
            Simulator
          </span>
        </motion.h1>
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-white/60 dark:bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg text-center max-w-4xl w-full"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Info className="text-purple-500" size={24} />
            <h2 className="text-2xl font-bold text-purple-500">What is a Process?</h2>
          </div>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            In an operating system, a <strong>process</strong> is an active program in execution.
            Processes need CPU time, memory, and I/O. Efficient scheduling leads to faster performance
            and fairness across tasks.
          </p>
        </motion.section>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl w-full"
        >
          <motion.section className="bg-white/60 dark:bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Cpu className="text-green-500" size={24} />
              <h2 className="text-2xl font-bold text-green-500">CPU Scheduling</h2>
            </div>
            <div className="text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
              CPU Scheduling determines which process runs on the CPU when multiple processes are waiting.
              It helps maximize CPU utilization and reduce waiting time.

              {"\n\n"}
              <strong className="text-green-600 dark:text-green-400">Formulae:</strong>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 text-left text-sm p-3 rounded-md text-gray-800 dark:text-gray-200 font-mono whitespace-pre-wrap">
                {cpuFormulae}
              </pre>
            </div>
          </motion.section>

          <motion.section className="bg-white/60 dark:bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <HardDrive className="text-blue-500" size={24} />
              <h2 className="text-2xl font-bold text-blue-500">Disk Scheduling</h2>
            </div>
            <div className="text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
              Disk Scheduling determines the order in which disk I/O requests are processed. It aims to reduce
              seek time and improve efficiency.

              {"\n\n"}
              <strong className="text-blue-600 dark:text-blue-400">Formulae:</strong>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 text-left text-sm p-3 rounded-md text-gray-800 dark:text-gray-200 font-mono whitespace-pre-wrap">
                {diskFormulae}
              </pre>
            </div>
          </motion.section>
        </motion.div>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center space-y-4"
        >
          <h2 className="text-xl text-indigo-400 font-semibold">Ready to explore more?</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => {
                setShowCPU(true);
                setShowDisk(false);
              }}
              className={cn(
                "relative inline-flex items-center gap-2 px-4 py-2 text-green-200 bg-gray-900 border-2 rounded-sm font-arcade text-xs tracking-wider transition-all duration-300 overflow-hidden",
                "border-green-400 before:border-green-400 hover:bg-green-300 hover:text-gray-900",
                "active:scale-95 shadow-[0_0_6px_#eab308] hover:shadow-[0_0_12px_#eab308]", "text-xl" ,
                "before:absolute before:inset-0 before:border-2 before:border-dotted before:animate-ping before:rounded-sm before:opacity-10"
              )}
            >
              <Cpu size={26} /> ▶ CPU Scheduling ◀
            </button>
            <button
              onClick={() => {
                setShowDisk(true);
                setShowCPU(false);
              }}
              className={cn(
                "relative inline-flex items-center gap-2 px-4 py-2 text-blue-200 bg-gray-900 border-2 rounded-sm font-arcade text-xs tracking-wider transition-all duration-300 overflow-hidden",
                "border-blue-400 before:border-blue-400 hover:bg-blue-300 hover:text-gray-900",
                "active:scale-95 shadow-[0_0_6px_#fb923c] hover:shadow-[0_0_12px_#fb923c]", "text-xl" ,
                "before:absolute before:inset-0 before:border-2 before:border-dotted before:animate-ping before:rounded-sm before:opacity-10"
              )}
            >
              <HardDrive size={26} /> ▶ Disk Scheduling ◀
            </button>
          </div>
        </motion.section>

        <AnimatePresence>
          {showCPU && (
            <motion.section
              key="cpu"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeInUp}
              className="max-w-5xl w-full"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Cpu className="text-green-400" size={24} />
                <h2 className="text-2xl font-bold text-green-400">CPU Scheduling Algorithms</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {Object.entries(cpuDescriptions).map(([algo, desc], i) => (
                  <motion.details
                    key={i}
                    {...floatCard}
                    className="group border border-green-400/60 rounded-xl bg-white/70 dark:bg-[#141620]/60 backdrop-blur-lg hover:shadow-2xl transition"
                  >
                    <summary className="cursor-pointer px-4 py-3 text-green-700 dark:text-green-300 font-semibold focus:outline-none focus:ring-2 focus:ring-green-400 rounded-md">
                      {algo} Scheduling
                    </summary>
                    <div className="px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 space-y-2">
                      <p><strong className="text-green-600 dark:text-green-400">Description:</strong></p>
                      <p>{desc.split("Pros:")[0].trim()}</p>
                      <p><strong className="text-green-600 dark:text-green-400">Pros:</strong></p>
                      <ul className="list-disc list-inside ml-4">
                        {desc.match(/Pros: ([\s\S]*?)(Cons:|$)/)?.[1]
                          .trim()
                          .split(";")
                          .filter(Boolean)
                          .map((pro, idx) => <li key={idx}>{pro.trim()}</li>)}
                      </ul>
                      <p><strong className="text-green-600 dark:text-green-400">Cons:</strong></p>
                      <ul className="list-disc list-inside ml-4">
                        {desc.match(/Cons: ([\s\S]*)/)?.[1]
                          .trim()
                          .split(";")
                          .filter(Boolean)
                          .map((con, idx) => <li key={idx}>{con.trim()}</li>)}
                      </ul>
                    </div>
                  </motion.details>
                ))}
              </div>
              <div className="text-center mt-6">
                <Link
                  href="/cpu"
                  className={cn(
                    "relative inline-flex items-center gap-2 px-4 py-2 text-green-200 bg-gray-900 border-2 rounded-sm font-arcade text-xs tracking-wider transition-all duration-300 overflow-hidden",
                    "border-green-400 before:border-green-400 hover:bg-green-300 hover:text-gray-900",
                    "active:scale-95 shadow-[0_0_6px_#eab308] hover:shadow-[0_0_12px_#eab308]", "text-[1.0rem]" ,
                    "before:absolute before:inset-0 before:border-2 before:border-dotted before:animate-ping before:rounded-sm before:opacity-10"
                  )}
                >
                  <SearchIcon size={14}/> Explore CPU Simulation
                </Link>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showDisk && (
            <motion.section
              key="disk"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeInUp}
              className="max-w-5xl w-full"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <HardDrive className="text-blue-400" size={24} />
                <h2 className="text-2xl font-bold text-blue-400">Disk Scheduling Algorithms</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {Object.entries(diskDescriptions).map(([algo, desc], i) => (
                  <motion.details
                    key={i}
                    {...floatCard}
                    className="group border border-blue-400/60 rounded-xl bg-white/70 dark:bg-[#141620]/60 backdrop-blur-lg hover:shadow-2xl transition"
                  >
                    <summary className="cursor-pointer px-4 py-3 text-blue-700 dark:text-blue-300 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md">
                      {algo} Algorithm
                    </summary>
                    <div className="px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 space-y-2">
                      <p><strong className="text-blue-600 dark:text-blue-400">Description:</strong></p>
                      <p>{desc.split("Pros:")[0].trim()}</p>
                      <p><strong className="text-blue-600 dark:text-blue-400">Pros:</strong></p>
                      <ul className="list-disc list-inside ml-4">
                        {desc.match(/Pros: ([\s\S]*?)(Cons:|$)/)?.[1]
                          .trim()
                          .split(";")
                          .filter(Boolean)
                          .map((pro, idx) => <li key={idx}>{pro.trim()}</li>)}
                      </ul>
                      <p><strong className="text-blue-600 dark:text-blue-400">Cons:</strong></p>
                      <ul className="list-disc list-inside ml-4">
                        {desc.match(/Cons: ([\s\S]*)/)?.[1]
                          .trim()
                          .split(";")
                          .filter(Boolean)
                          .map((con, idx) => <li key={idx}>{con.trim()}</li>)}
                      </ul>
                    </div>
                  </motion.details>
                ))}
              </div>
              <div className="text-center mt-6">
                <Link
                  href="/disk"
                  className={cn(
                    "relative inline-flex items-center gap-2 px-4 py-2 text-blue-200 bg-gray-900 border-2 rounded-sm font-arcade text-[1.0rem] tracking-wider transition-all duration-300 overflow-hidden",
                    "border-blue-400 before:border-blue-400 hover:bg-blue-300 hover:text-gray-900",
                    "active:scale-95 shadow-[0_0_6px_#fb923c] hover:shadow-[0_0_12px_#fb923c]",
                    "before:absolute before:inset-0 before:border-2 before:border-dotted before:animate-ping before:rounded-sm before:opacity-10"
                  )}
                >
                  <SearchIcon /> Explore Disk Simulation
                </Link>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <footer className="text-sm text-neutral-600 dark:text-neutral-400 text-center pt-10">
          Made by <span className="text-pink-400">Pranjal Kundu</span> |{" "}
          <span className="italic text-indigo-500">ScheduloViz</span> © 2025
        </footer>
      </main>
    </div>
  );
}
