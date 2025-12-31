// ServiceCard Component
export default function ServiceCard({
	title,
	description,
}: Readonly<{ title: string; description: string }>) {
	return (
		<div className="space-y-2 lg:border-r-2 last:border-r-0 border-muted-foreground">
			<h3 className="text-xs sm:text-sm font-bold uppercase tracking-tight">
				{title}
			</h3>
			<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
				{description}
			</p>
		</div>
	);
}
