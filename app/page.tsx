import Header from "@/components/layout/header/Header";
import HeroSection from "@/components/layout/hero/HeroSection";

export default function Home() {
	return (
		<main className="bg-background mx-auto w-[85%]">
			<Header />
			<HeroSection />
		</main>
	);
}
