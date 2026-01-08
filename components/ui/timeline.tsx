import { Badge } from "@/components/ui/badge";
import { Building2, Calendar } from "lucide-react";
interface Experience {
	title: string;
	company?: string;
	period: string;
	description: string;
	technologies?: string[];
}

const experiences: Experience[] = [
	{
		title: "Universal Contract M365 Admin Support",
		period: "Apr 2025 - Sep 2025",
		description: `A Microsoft 365 Cloud Administrator responsible for setting up, managing, and maintaining Microsoft 365 tenants for medium and growing businesses. Ensures a stable, well-configured Microsoft 365 environment that supports daily business operations without disruption.`,
		// technologies: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
	},
	{
		title: "Universal Contract M365 Admin Support",
		period: "Fep 2025 - Apr 2025",
		description:
			"A security-focused Microsoft 365 specialist dedicated to protecting business environments through best-practice security and compliance configurations. Protects company data, users, and devices while ensuring compliance and reducing security risks.",
		technologies: ["office 365", "azure", "inTune", "power apps"],
	},
	{
		title: "Universal Contract M365 Admin Support",
		period: "Oct 2024 - Fep 2025",
		description:
			"A Microsoft 365 specialist focused on collaboration tools and device management to improve productivity and simplify IT operations. Improves team productivity while keeping devices and collaboration tools secure and easy to use.",
	},
];

const Timeline = () => {
	return (
		<div className="max-w-(--breakpoint-md) mx-auto my-12 md:my-20">
			<div className="relative">
				{/* Timeline line */}
				<div className="absolute left-4 md:left-1/2 top-0 bottom-0 border-l-2" />

				{experiences.map(
					(
						{ company = "Microsoft", description, period, technologies, title },
						index
					) => {
						const isLeft = index % 2 === 1;

						return (
							<div
								key={`timeline-item-${title}-${index}`}
								className="relative grid grid-cols-1 md:grid-cols-2 pb-12 last:pb-0"
							>
								{/* Timeline dot */}
								<div className="absolute left-4 md:left-1/2 top-3 -translate-x-1/2 h-3 w-3 rounded-full border-2 border-primary bg-background" />

								{/* Content */}
								<div
									className={`
										relative ml-8 md:ml-0 space-y-3 
										${isLeft ? "md:col-start-1 md:mr-12 md:text-right" : "md:col-start-2 md:ml-12"}
									`}
								>
									<div
										className={`flex items-center gap-2.5 ${
											isLeft ? "md:flex-row-reverse" : ""
										}`}
									>
										<div className="shrink-0 h-9 w-9 bg-accent rounded-full flex items-center justify-center">
											<Building2 className="h-5 w-5 text-muted-foreground" />
										</div>
										{company && (
											<span className="text-base font-medium">{company}</span>
										)}
									</div>

									<div>
										<h3 className="text-xl font-semibold tracking-[-0.01em]">
											{title}
										</h3>
										<div
											className={`flex items-center gap-2 mt-2 text-sm ${
												isLeft ? "md:justify-end" : ""
											}`}
										>
											<Calendar className="h-4 w-4" />
											<span>{period}</span>
										</div>
									</div>

									<p className="text-sm sm:text-base text-muted-foreground text-pretty">
										{description}
									</p>

									{technologies && (
										<div
											className={`flex flex-wrap gap-2 ${
												isLeft ? "md:justify-end" : ""
											}`}
										>
											{technologies.map((tech) => (
												<Badge
													key={tech}
													variant="secondary"
													className="rounded-full bg-foreground text-background"
												>
													{tech}
												</Badge>
											))}
										</div>
									)}
								</div>
							</div>
						);
					}
				)}
			</div>
		</div>
	);
};

export default Timeline;
