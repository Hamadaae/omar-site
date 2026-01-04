// StatItem Component
export default function StatItem({
	value,
	label,
}: Readonly<{ value: string; label: string }>) {
	return (
		<div className="text-center  w-full h-full">
			<div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
				{value}
			</div>
			<div className="text-xs sm:text-sm text-muted-foreground">{label}</div>
		</div>
	);
}
