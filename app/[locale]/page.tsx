import Header from "@/components/layout/header/Header";
import HeroSection from "@/components/layout/hero/HeroSection";
import TrustedBySection from "@/components/layout/TrustedBySection";
import CraftingSection from "@/components/layout/CraftingSection";
import ContactUs from "@/components/layout/contactUs/ContactUs";

export default function Home() {
	return (
		<main className="bg-background mx-auto w-[80%]">
			<Header />
			<HeroSection />
			<TrustedBySection />
			<CraftingSection />
			<ContactUs />
		</main>
	);
}
