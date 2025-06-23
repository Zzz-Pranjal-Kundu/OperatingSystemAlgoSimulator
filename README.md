# 🧠 CPU Scheduling Algorithm Simulator

An interactive, web-based simulator for learning and visualizing various CPU scheduling algorithms including **First Come First Serve (FCFS)**, **Round Robin (RR)**, **Shortest Job First (SJF)**, and **Shortest Remaining Time First (SRTF)**. Built to aid students and operating system enthusiasts in intuitively grasping how CPU schedulers work.

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
