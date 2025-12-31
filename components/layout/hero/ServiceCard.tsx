// ServiceCard Component
export default function ServiceCard({
	title,
	description,
}: Readonly<{ title: string; description: string }>) {
	return (
		<div className="space-y-2">
			<h3 className="text-xs sm:text-sm font-bold uppercase tracking-tight">
				{title}
			</h3>
			<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
				{description}
			</p>
		</div>
	);
}
