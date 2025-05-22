import NavBar from "@/components/ui/NavBar";
import DiskForm from "@/components/disk/DiskForm";
import HyperText from "@/components/ui/hyper-text";

export default function DiskPage() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="container max-w-4xl mx-auto p-5">
        <HyperText
          className="text-3xl font-semibold text-black dark:text-white mb-6"
          text="Disk Scheduling"
        />
        <DiskForm />
      </div>
    </div>
  );
}
