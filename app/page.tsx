import Header from "@/components/layout/header/Header";
import HeroSection from "@/components/layout/hero/HeroSection";

export default function Home() {
	return (
		<main className="border border-gray-400 rounded-2xl mx-auto w-[90%]">
			<Header />
			<HeroSection />
		</main>
	);
}
