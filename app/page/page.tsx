import NavBar from "@/components/ui/NavBar";
import PageForm from "@/components/page/PageForm";
import HyperText from "@/components/ui/hyper-text";

export default function PageReplacementPage() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="container max-w-4xl mx-auto p-5">
        <HyperText
          className="text-3xl font-semibold text-black dark:text-white mb-6"
          text="Page Replacement Algorithms"
        />
        <PageForm />
      </div>
    </div>
  );
}
