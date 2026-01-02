import ServiceCard from "./ServiceCard";
import StatItem from "./StatItem";
import Image from "next/image";
import RolesSlider from "./RolesSlider";

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
		<section className="relative bg-background pt-20 overflow-hidden">
			{/* Background Image Layer */}
			<div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 z-0 display-none lg:block">
				<div className="relative w-72 h-105 lg:w-80 lg:h-130 overflow-hidden rounded-b-full bg-surface-subtle shadow-2xl">
					<Image
						src="/MarwanMamdouh.jpg"
						alt="Profile"
						fill
						className="object-cover"
						priority
					/>
				</div>
			</div>

			{/* Content */}
			<div className="relative z-10 w-full mx-auto px-6 lg:px-12 py-12">
				{/* Hero Grid */}
				<div className="grid grid-cols-2 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-start mb-24">
					{/* Left - Text */}
					<div className="space-y-8 max-w-md">
						<div>
							<p className="text-xl text-muted-foreground capitalize">
								hey. i&apos;m omar,
							</p>
							<div className="flex items-start justify-center h-22">
								<RolesSlider />
							</div>
						</div>

						<p className="text-base capitalize text-muted-foreground max-w-sm leading-relaxed">
							let&apos;s unlock the full potential of Microsoft azure, cloud
							subscription and microsoft services
						</p>

						<button className="group inline-flex items-center gap-3 px-3 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-full">
							<span className="text-sm uppercase tracking-wider font-medium">
								Contact Me
							</span>
							<div className="flex items-center justify-center w-9 h-9 rounded-full bg-background text-primary transition-transform group-hover:translate-x-1">
								<svg
									className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
							</div>
						</button>
					</div>

					{/* Right - Stats (overlapping image) */}
					<div className="flex flex-col py-5">
						{stats.map((stat) => (
							<StatItem
								key={stat.label}
								value={stat.value}
								label={stat.label}
							/>
						))}
					</div>
				</div>

				{/* Services */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
