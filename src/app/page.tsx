import HeroName from "@/components/HeroName";
import ToolkitSection from "@/components/ToolkitSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection"; // Changed from InterestsSection

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)] text-gray-200 w-full max-w-full ">
      <HeroName />
      <ToolkitSection />
      <ProjectsSection />
      <ContactSection /> {/* Changed from InterestsSection */}
    </div>
  );
}
