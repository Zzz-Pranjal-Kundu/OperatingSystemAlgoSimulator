import NavBar from "@/components/ui/NavBar";
import MainForm from "@/components/cpu/MainForm";
import HyperText from "@/components/ui/hyper-text";

export default function CpuPage() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <NavBar />
      <div className="w-full flex justify-center">
        <HyperText
          className="md:text-4xl font-bold text-black dark:text-white mb-6 text-center"
          text="CPU Scheduling"
        />
      </div>
      <div className="mx-auto p-5">
        <MainForm />
      </div>
    </div>
  );
}
