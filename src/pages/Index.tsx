import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FormsSection from "@/components/FormsSection";
import FooterSection from "@/components/FooterSection";

export default function Index() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <HeroSection />
      <FormsSection />
      <FooterSection />
    </div>
  );
}
