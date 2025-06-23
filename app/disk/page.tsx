import NavBar from "@/components/ui/NavBar";
import DiskForm from "@/components/disk/DiskForm";
import AnimatedTitle from "@/components/ui/TitleTyping";

export default function DiskPage() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="container max-w-4xl mx-auto p-5">
        <AnimatedTitle content="DISK SCHEDULING" icon="disk" />
        <DiskForm />
      </div>
    </div>
  );
}
