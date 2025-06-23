// "use client";

// import NavBar from "@/components/ui/NavBar";
// import Particles from "@/components/ui/particles";
// import { useEffect, useState } from "react";
// import { useTheme } from "next-themes";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import { Cpu, HardDrive, Info } from "lucide-react";

// export default function Home() {
//   const { theme } = useTheme();
//   const [color, setColor] = useState("#ffffff");
//   const [showCPU, setShowCPU] = useState(false);
//   const [showDisk, setShowDisk] = useState(false);

//   useEffect(() => {
//     setColor(theme === "dark" ? "#ffffff" : "#000000");
//   }, [theme]);

//   const fadeInUp = {
//     hidden: { opacity: 0, y: 40 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
//     },
//     exit: {
//       opacity: 0,
//       y: -20,
//       transition: { duration: 0.4, ease: "easeInOut" },
//     },
//   };

//   const scaleHover = {
//     whileHover: { scale: 1.05 },
//     whileTap: { scale: 0.95 },
//   };

//   const floatCard = {
//     whileHover: {
//       y: -5,
//       boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
//       transition: { duration: 0.3 },
//     },
//   };

//   return (
//     <div className="relative min-h-screen bg-[rgba(255,255,255,0.6)] dark:bg-[rgba(20,20,30,0.6)] backdrop-blur-xl">
//       <NavBar />
//       <Particles
//         className="absolute inset-0 -z-10"
//         quantity={120}
//         ease={80}
//         color={color}
//         refresh
//       />

//       <main className="flex flex-col items-center justify-center px-6 py-10 space-y-10 overflow-x-hidden">
//         <motion.h1
//           initial="hidden"
//           animate="visible"
//           variants={fadeInUp}
//           className="text-5xl font-extrabold text-center text-neutral-800 dark:text-neutral-100 tracking-wide leading-tight"
//         >
//           <span className="block text-indigo-400 drop-shadow-md">
//             Schedulo<span className="text-pink-400">Viz</span>
//           </span>
//           <span className="mt-2 inline-block text-base sm:text-lg font-medium text-neutral-600 dark:text-neutral-300 italic">
//             Interactive <span className="text-green-500">Process</span> &amp;{" "}
//             <span className="text-blue-400">Disk Scheduling</span> Simulator
//           </span>
//         </motion.h1>

//         <motion.section
//           initial="hidden"
//           animate="visible"
//           variants={fadeInUp}
//           className="bg-white/60 dark:bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg text-center max-w-4xl w-full"
//         >
//           <div className="flex items-center justify-center gap-2 mb-2">
//             <Info className="text-purple-500" size={24} />
//             <h2 className="text-2xl font-bold text-purple-500">What is a Process?</h2>
//           </div>
//           <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
//             In an operating system, a <strong>process</strong> is an active program in execution. Processes need CPU time, memory, and I/O. Efficient scheduling leads to faster performance and fairness across tasks.
//           </p>
//         </motion.section>

//         {/* CPU + Disk Explanation with Formulae */}
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={fadeInUp}
//           className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl w-full"
//         >
//           {/* CPU Scheduling Card */}
//           <motion.section className="bg-white/60 dark:bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg text-center">
//             <div className="flex items-center justify-center gap-2 mb-2">
//               <Cpu className="text-green-500" size={24} />
//               <h2 className="text-2xl font-bold text-green-500">CPU Scheduling</h2>
//             </div>
//             <div className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm space-y-1">
//               CPU Scheduling decides which process should be executed next by the CPU when multiple processes are ready. The goal is to maximize CPU utilization, reduce waiting time, and ensure fairness among processes.
//               <br /><br />
//               <span className="font-semibold text-green-600 dark:text-green-300">Key Formulae:</span>
//               <ul className="text-left list-disc list-inside mt-2 text-green-700 dark:text-green-200 text-xs space-y-1">
//                 <li><strong>Completion Time (CT)</strong> = Time at which the process completes</li>
//                 <li><strong>Turnaround Time (TAT)</strong> = CT − Arrival Time</li>
//                 <li><strong>Waiting Time (WT)</strong> = TAT − Burst Time</li>
//                 <li><strong>Response Time (RT)</strong> = First CPU allocation − Arrival Time</li>
//                 <li><strong>Throughput</strong> = Total processes / Total time</li>
//                 <li><strong>CPU Efficiency</strong> = (CPU busy time / Total time) × 100%</li>
//               </ul>
//             </div>
//           </motion.section>

//           {/* Disk Scheduling Card */}
//           <motion.section className="bg-white/60 dark:bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg text-center">
//             <div className="flex items-center justify-center gap-2 mb-2">
//               <HardDrive className="text-blue-500" size={24} />
//               <h2 className="text-2xl font-bold text-blue-500">Disk Scheduling</h2>
//             </div>
//             <div className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm space-y-1">
//               Disk Scheduling manages the order of I/O requests to the disk drive, aiming to reduce head movement and improve access times.
//               <br /><br />
//               <span className="font-semibold text-blue-600 dark:text-blue-300">Key Formulae:</span>
//               <ul className="text-left list-disc list-inside mt-2 text-blue-700 dark:text-blue-200 text-xs space-y-1">
//                 <li><strong>Head Movement</strong> = Total number of tracks traversed</li>
//                 <li><strong>Total Seek Time</strong> = Σ |Current Head − Next Request|</li>
//                 <li><strong>Average Seek Time</strong> = Total Seek Time / No. of Requests</li>
//               </ul>
//             </div>
//           </motion.section>
//         </motion.div>

//         {/* Select Buttons */}
//         <motion.section
//           initial="hidden"
//           animate="visible"
//           variants={fadeInUp}
//           className="text-center space-y-4"
//         >
//           <h2 className="text-xl text-indigo-400 font-semibold">Ready to explore more?</h2>
//           <div className="flex flex-wrap gap-4 justify-center">
//             <motion.button
//               {...scaleHover}
//               onClick={() => {
//                 setShowCPU(true);
//                 setShowDisk(false);
//               }}
//               className="bg-green-400/80 backdrop-blur-lg text-white px-6 py-3 rounded-lg hover:bg-green-500 shadow-md font-semibold flex items-center gap-2"
//             >
//               <Cpu size={20} /> CPU Scheduling
//             </motion.button>
//             <motion.button
//               {...scaleHover}
//               onClick={() => {
//                 setShowDisk(true);
//                 setShowCPU(false);
//               }}
//               className="bg-blue-400/80 backdrop-blur-lg text-white px-6 py-3 rounded-lg hover:bg-blue-500 shadow-md font-semibold flex items-center gap-2"
//             >
//               <HardDrive size={20} /> Disk Scheduling
//             </motion.button>
//           </div>
//         </motion.section>

//         {/* CPU Algorithms */}
//         <AnimatePresence>
//           {showCPU && (
//             <motion.section
//               key="cpu"
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               variants={fadeInUp}
//               className="max-w-5xl w-full"
//             >
//               <div className="flex items-center justify-center gap-2 mb-4">
//                 <Cpu className="text-green-400" size={24} />
//                 <h2 className="text-2xl font-bold text-green-400">CPU Scheduling Algorithms</h2>
//               </div>
//               <div className="grid gap-4 sm:grid-cols-2">
//                 {["FCFS", "SJF", "Round Robin", "Priority"].map((algo, i) => (
//                   <motion.details
//                     key={i}
//                     {...floatCard}
//                     className="group border border-green-400/60 rounded-xl bg-white/70 dark:bg-[#141620]/60 backdrop-blur-lg hover:shadow-2xl transition"
//                   >
//                     <summary className="cursor-pointer px-4 py-3 text-green-700 dark:text-green-300 font-semibold">
//                       {algo} Scheduling
//                     </summary>
//                     <div className="px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300">
//                       Description for {algo} algorithm.
//                     </div>
//                   </motion.details>
//                 ))}
//               </div>
//               <div className="text-center mt-6">
//                 <Link
//                   href="/cpu"
//                   className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition font-semibold shadow-md"
//                 >
//                   🔍 Explore CPU Simulation
//                 </Link>
//               </div>
//             </motion.section>
//           )}
//         </AnimatePresence>

//         {/* Disk Algorithms */}
//         <AnimatePresence>
//           {showDisk && (
//             <motion.section
//               key="disk"
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               variants={fadeInUp}
//               className="max-w-5xl w-full"
//             >
//               <div className="flex items-center justify-center gap-2 mb-4">
//                 <HardDrive className="text-blue-400" size={24} />
//                 <h2 className="text-2xl font-bold text-blue-400">Disk Scheduling Algorithms</h2>
//               </div>
//               <div className="grid gap-4 sm:grid-cols-2">
//                 {["FCFS", "SSTF", "SCAN", "LOOK"].map((algo, i) => (
//                   <motion.details
//                     key={i}
//                     {...floatCard}
//                     className="group border border-blue-400/60 rounded-xl bg-white/70 dark:bg-[#141620]/60 backdrop-blur-lg hover:shadow-2xl transition"
//                   >
//                     <summary className="cursor-pointer px-4 py-3 text-blue-700 dark:text-blue-300 font-semibold">
//                       {algo} Algorithm
//                     </summary>
//                     <div className="px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300">
//                       Description for {algo} disk scheduling.
//                     </div>
//                   </motion.details>
//                 ))}
//               </div>
//               <div className="text-center mt-6">
//                 <Link
//                   href="/disk"
//                   className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition font-semibold shadow-md"
//                 >
//                   🔍 Explore Disk Simulation
//                 </Link>
//               </div>
//             </motion.section>
//           )}
//         </AnimatePresence>

//         <footer className="text-sm text-neutral-600 dark:text-neutral-400 text-center pt-10">
//           Made by <span className="text-pink-400">VisualEyeZers</span> | <span className="italic text-indigo-500">ScheduloViz</span> © 2025
//         </footer>
//       </main>
//     </div>
//   );
// }








"use client";

import NavBar from "@/components/ui/NavBar";
import Particles from "@/components/ui/particles";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, HardDrive, Info, SearchIcon } from "lucide-react";

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

  const scaleHover = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
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
Pros: Simple to implement, fair in terms of arrival time.
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
          className="text-5xl font-extrabold text-center text-neutral-800 dark:text-neutral-100 tracking-wide leading-tight"
        >
          <span className="block text-indigo-400 drop-shadow-md">
            Schedulo<span className="text-pink-400">Viz</span>
          </span>
          <span className="mt-2 inline-block text-base sm:text-lg font-medium text-neutral-600 dark:text-neutral-300 italic">
            Interactive <span className="text-green-500">Process</span> &amp;{" "}
            <span className="text-blue-400">Disk Scheduling</span> Simulator
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
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
              CPU Scheduling determines which process runs on the CPU when multiple processes are waiting.
              It helps maximize CPU utilization and reduce waiting time.

              {"\n\n"}Formulae:
              {cpuFormulae}
            </p>
          </motion.section>

          <motion.section className="bg-white/60 dark:bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <HardDrive className="text-blue-500" size={24} />
              <h2 className="text-2xl font-bold text-blue-500">Disk Scheduling</h2>
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
              Disk Scheduling determines the order in which disk I/O requests are processed. It aims to reduce
              seek time and improve efficiency.

              {"\n\n"}Formulae:
              {diskFormulae}
            </p>
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
            <motion.button
              {...scaleHover}
              onClick={() => {
                setShowCPU(true);
                setShowDisk(false);
              }}
              className="bg-green-400/80 backdrop-blur-lg text-white px-6 py-3 rounded-lg hover:bg-green-500 shadow-md font-semibold flex items-center gap-2"
            >
              <Cpu size={20} /> CPU Scheduling
            </motion.button>
            <motion.button
              {...scaleHover}
              onClick={() => {
                setShowDisk(true);
                setShowCPU(false);
              }}
              className="bg-blue-400/80 backdrop-blur-lg text-white px-6 py-3 rounded-lg hover:bg-blue-500 shadow-md font-semibold flex items-center gap-2"
            >
              <HardDrive size={20} /> Disk Scheduling
            </motion.button>
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
                    <summary className="cursor-pointer px-4 py-3 text-green-700 dark:text-green-300 font-semibold">
                      {algo} Scheduling
                    </summary>
                    <div className="px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
                      {desc}
                    </div>
                  </motion.details>
                ))}
              </div>
              <div className="text-center mt-6">
                <Link
                  href="/cpu"
                  className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition font-semibold shadow-md"
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
                    <summary className="cursor-pointer px-4 py-3 text-blue-700 dark:text-blue-300 font-semibold">
                      {algo} Algorithm
                    </summary>
                    <div className="px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
                      {desc}
                    </div>
                  </motion.details>
                ))}
              </div>
              <div className="text-center mt-6">
                <Link
                  href="/disk"
                  className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition font-semibold shadow-md"
                >
                  <SearchIcon /> Explore Disk Simulation
                </Link>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <footer className="text-sm text-neutral-600 dark:text-neutral-400 text-center pt-10">
          Made by <span className="text-pink-400">VisualEyeZers</span> |{" "}
          <span className="italic text-indigo-500">ScheduloViz</span> © 2025
        </footer>
      </main>
    </div>
  );
}
