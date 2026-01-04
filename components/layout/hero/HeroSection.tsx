import ServiceCard from "./ServiceCard";
import StatItem from "./StatItem";
import Image from "next/image";
import RolesSlider from "./RolesSlider";
import { getTranslations } from "next-intl/server";

export default async function HeroSection() {
	const t = await getTranslations("Hero");

	const stats = [
		{ value: t("stats.0.value"), label: t("stats.0.label") },
		{ value: t("stats.1.value"), label: t("stats.1.label") },
		{ value: t("stats.2.value"), label: t("stats.2.label") },
		{ value: t("stats.3.value"), label: t("stats.3.label") },
	];

	const services = [
		{
			title: t("services.0.title"),
			description: t("services.0.description"),
		},
		{
			title: t("services.1.title"),
			description: t("services.1.description"),
		},
		{
			title: t("services.2.title"),
			description: t("services.2.description"),
		},
		{
			title: t("services.3.title"),
			description: t("services.3.description"),
		},
	];

	return (
		<section className="relative overflow-hidden w-full">
			{/* Hero Grid */}
			<div className="grid gird-cols-1 lg:grid-cols-2 gap-3 my-15">
				{/* Left - Text */}
				<div className="space-y-8">
					<div>
						<p className="text-3xl text-muted-foreground capitalize">
							{t("greeting")}
						</p>
						<div className="flex items-start justify-center h-32">
							<RolesSlider />
						</div>
					</div>

					<p className="flex-1 text-lg md:text-xl capitalize text-muted-foreground leading-relaxed">
						{t("subtitle")}
					</p>

					{/* Right - Stats (overlapping image) */}
					<div className="flex justify-evenly gap-3 items-stretch">
						{stats.map((stat) => (
							<StatItem
								key={stat.label}
								value={stat.value}
								label={stat.label}
							/>
						))}
					</div>
					<div className="mx-auto flex justify-center items-center md:justify-start">
						<button className="group inline-flex items-center gap-3 px-3 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-full">
							<span className="text-sm uppercase tracking-wider font-medium">
								{t("ctaButton")}
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
				</div>
				{/* Background Image Layer */}
				<div className="pointer-events-none display-none lg:block">
					<div className="relative w-72 h-105 lg:w-80 lg:h-130 overflow-hidden rounded-b-full bg-surface-subtle shadow-2xl ms-auto">
						<Image
							src="/MarwanMamdouh.jpg"
							alt="Profile"
							fill
							// width={800}
							// height={600}
							className="object-cover"
							priority
						/>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
				{/* Services */}
				{services.map((service) => (
					<ServiceCard
						key={service.title}
						title={service.title}
						description={service.description}
					/>
				))}
			</div>
		</section>
	);
}
