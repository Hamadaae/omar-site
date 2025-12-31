// StatItem Component
export default function StatItem({
	value,
	label,
}: Readonly<{ value: string; label: string }>) {
	return (
		<div className="text-right">
			<div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1">
				{value}
			</div>
			<div className="text-xs sm:text-sm text-muted-foreground">{label}</div>
		</div>
	);
}
