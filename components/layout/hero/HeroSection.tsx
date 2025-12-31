import ServiceCard from "./ServiceCard";
import StatItem from "./StatItem";

// HeroSection Component
export default function HeroSection() {
	const stats = [
		{ value: "15+", label: "Years Experience" },
		{ value: "280+", label: "Projects Delivered" },
		{ value: "*99%", label: "Client Satisfaction" },
		{ value: "50", label: "Clients Worldwide" },
	];

	const services = [
		{
			title: "USER-CENTERED DESIGN",
			description:
				"Designing intuitive and accessible experiences tailored for your audience.",
		},
		{
			title: "BRAND IDENTITY & STRATEGY",
			description:
				"Creating cohesive visual systems that define your brand unforgettably.",
		},
		{
			title: "RESPONSIVE & MODERN UI",
			description: "Pixel perfect designs optimized for all devices.",
		},
		{
			title: "SEAMLESS PROTOTYPING",
			description:
				"Interactive prototypes to bring ideas to life before development.",
		},
	];

	return (
		<section className="min-h-screen bg-background pt-20">
			<div className="max-w-350 mx-auto px-6 lg:px-12 py-12 sm:py-16 lg:py-24">
				{/* Hero Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-8 sm:gap-12 lg:gap-16 items-start mb-16 sm:mb-20 lg:mb-24">
					{/* Left Column - Text Content */}
					<div className="space-y-6 sm:space-y-8">
						<div>
							<p
								className="text-base sm:text-lg mb-3 sm:mb-4 text-muted-foreground
"
							>
								Hey. I&apos;m Solt,
							</p>
							<h1 className="space-y-1">
								<span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none">
									A UI/UX
								</span>
								<span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif italic leading-none">
									& Brand
								</span>
								<span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none">
									DESIGNER
								</span>
							</h1>
						</div>

						<p className="text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
							Transforming ideas into stunning visuals – UI/UX and brand design
							that captivates, engages, and delivers results.
						</p>

						<button className="group flex items-center gap-3 px-5 sm:px-6 py-2.5 sm:py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
							<span className="text-xs sm:text-sm uppercase tracking-wider font-medium">
								Contact Me
							</span>
							<svg
								className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
						</button>
					</div>

					{/* Center Column - Profile Image */}
					<div className="flex justify-center lg:justify-start order-first lg:order-0">
						<div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
							<div className="absolute inset-0 bg-linear-to-br from-gray-300 to-gray-400 rounded-full overflow-hidden">
								{/* Placeholder for profile image */}
								<div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
									Profile Image
								</div>
							</div>
						</div>
					</div>

					{/* Right Column - Stats */}
					<div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-col gap-6 sm:gap-8 lg:pt-4">
						{stats.map((stat) => (
							<StatItem key={stat.label} value={stat.value} label={stat.label} />
						))}
					</div>
				</div>

				{/* Services Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
					{services.map((service) => (
						<ServiceCard
							key={service.title}
							title={service.title}
							description={service.description}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
