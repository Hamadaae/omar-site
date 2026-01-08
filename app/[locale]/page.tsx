import Header from "@/components/layout/header/Header";
import HeroSection from "@/components/layout/hero/HeroSection";
import TechSlider from "@/components/layout/tech-slider/TechSlider";
import CraftingSection from "@/components/layout/CraftingSection";
import ContactUs from "@/components/layout/contactUs/ContactUs";
import Timeline from "@/components/ui/timeline";

export default function Home() {
	return (
		<main className="bg-background mx-auto w-[80%]">
			<Header />
			<HeroSection />
			<TechSlider />
			<CraftingSection />
			<Timeline />
			<ContactUs />
		</main>
	);
}
