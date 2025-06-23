import NavBar from "@/components/ui/NavBar";
import MainForm from "@/components/cpu/MainForm";
import AnimatedTitle from "../../components/ui/TitleTyping";

export default function CpuPage() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <NavBar />
      <div className="w-full flex justify-center">
        <AnimatedTitle content="CPU SCHEDULING" icon="cpu" />
      </div>
      <div className="mx-auto p-5">
        <MainForm />
      </div>
    </div>
  );
}
