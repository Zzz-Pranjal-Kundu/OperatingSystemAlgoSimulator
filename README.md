# 🧠 CPU Scheduling Algorithm Simulator

An interactive, web-based simulator designed to help users understand and visualize how different CPU and Disk scheduling algorithms work. Built with a focus on educational clarity, this tool is ideal for students and operating system enthusiasts who want to explore scheduling concepts through hands-on interaction.

CPU Scheduling Algorithms Supported:
  First Come First Serve (FCFS)
  
  Round Robin (RR)
  
  Shortest Job First (SJF)
  
  Shortest Remaining Time First (SRTF)
  
  Priority Scheduling

Disk Scheduling Algorithms Supported:
  FCFS (First Come First Serve)
  
  SSTF (Shortest Seek Time First)
  
  SCAN
  
  LOOK
  
  C-SCAN
  
  C-LOOK

Key Features
  Educational Focus
    Built to simplify complex scheduling algorithms through step-by-step animations and clear process flow.
  
  Interactive Configuration
    Users can add, edit, and configure process or disk requests with parameters like arrival time, burst time, priority, and seek position.
  
  Real-Time Visualization
    Animates CPU and disk executions, helping users visually grasp queue operations and scheduling order.
  
  Clean User Interface
      Styled with Tailwind CSS, offering light/dark themes and a minimal, responsive layout.
  
  Modular and Scalable Architecture
  Built with reusable components in Next.js and TypeScript for maintainability and future extensibility.

🔗 **Live Demo:** [https://os-algo-simulator.vercel.app](https://os-algo-simulator.vercel.app
---

## 📌 Table of Contents

- [📖 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Technologies Used](#-technologies-used)
- [📁 Project Structure](#project-structure)
- [🚀 Installation](#-installation)
- [🧪 Usage](#-usage)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 📖 Overview

This simulator enables users to input processes with configurable parameters such as **arrival time**, **burst time**, and visualize how they are executed under different CPU scheduling strategies. The real-time animations provide a clearer understanding of how scheduling affects process execution.

---

## ✨ Features

- 🎛 **Interactive Process Form** – Add processes with attributes like arrival time, burst time, and custom colors.
- 🧮 **Multiple Scheduling Algorithms** – Supports FCFS, RR, SJF, and SRTF.
- 🎞 **Real-Time Visual Feedback** – Watch processes animate through the scheduler dynamically.
- 🌗 **Dark/Light Mode** – Seamless theme toggle with `ThemeProvider`.
- 🔍 **Validation with Zod** – Ensures clean and valid user inputs.
- ⚡ **Responsive Design** – Works smoothly across devices.

---

## 🛠️ Technologies Used
______________________________________________________________
| Tech Stack         | Purpose                                |
|--------------------|----------------------------------------|
| **Next.js**        | React-based framework for the UI       |
| **TypeScript**     | Type safety and developer experience   |
| **Tailwind CSS**   | Utility-first modern styling           |
| **React Hook Form**| Form state management                  |
| **Zod**            | Schema validation                      |
| **Lucide Icons**   | Iconography for modern UIs             |
_______________________________________________________________

---

## 📁 Project Structure
<pre>
scheduling-algorithm-simulator/
├── components/
│ └── ProcessForm.tsx
│ └── SimulatorCanvas.tsx
├── pages/
│ └── index.tsx
│ └── cpu.tsx
├── styles/
├── public/
├── utils/
└── app/
</pre>

---

## 🚀 Installation

> **Prerequisites**:  
> Node.js, npm or Yarn installed.

### 1. Clone the Repository

```bash
git clone https://github.com/Zzz-Pranjal-Kundu/OperatingSystemAlgoSimulator.git
cd OperatingSystemAlgoSimulator

```
### 2. Install Dependencies
```
# Using Yarn
yarn install

# OR using npm
npm install
```

### 3. Start Development Server

```bash
# Using Yarn
yarn dev

# OR using npm
npm run dev
```
Now open your browser and go to http://localhost:3000

---


## 📦 Build for Production
```bash
# Using Yarn
yarn build

# OR using npm
npm run build
```
The production build will be available in the .next/ directory.


---

## 🧪 Usage
  ➕ Add Processes – Enter process details via the form.
  
  🔄 Select Algorithm – Choose FCFS, RR, SJF, or SRTF.
  
  ▶ Start Simulation – Visualize how the CPU schedules and executes the processes.

---

## 🤝 Contributing
    We welcome contributions! Here's how to get started:
    
    Fork this repo.
    
    Create a branch: git checkout -b your-feature-name
    
    Commit your changes: git commit -m "Add some feature"
    
    Push the branch: git push origin your-feature-name
    
    Open a Pull Request.
    
    For major feature proposals, please open an issue first.
---

📄 License
This project is open-sourced under the MIT License.



✨ Made with love for learners and OS geeks by ZzzPranjalzzZ.
