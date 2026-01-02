import Header from "@/components/layout/header/Header";
import HeroSection from "@/components/layout/hero/HeroSection";
import TrustedBySection from "@/components/layout/TrustedBySection";
import CraftingSection from "@/components/layout/CraftingSection";

export default function Home() {
	return (
		<main className="bg-background mx-auto w-[85%]">
			<Header />
			<HeroSection />
			<TrustedBySection />
			<CraftingSection />
		</main>
	);
}
