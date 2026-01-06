export function DecorativeFrame() {
	return (
		<>
			{/* Top-left corner border */}
			<div className="absolute -top-4 -left-4 w-12 h-12 md:w-16 md:h-16 rounded-tl-lg border-l-4 border-t-4 border-accent opacity-60"></div>

			{/* Bottom-right corner border */}
			<div className="absolute -bottom-4 -right-4 w-12 h-12 md:w-16 md:h-16 rounded-br-lg border-r-4 border-b-4 border-accent opacity-60"></div>

			{/* Decorative circles */}
			<div className="flex gap-3 mt-6 md:mt-8">
				<div className="w-2 h-2 rounded-full bg-accent"></div>
				<div className="w-2 h-2 rounded-full bg-muted"></div>
				<div className="w-2 h-2 rounded-full bg-border"></div>
			</div>
		</>
	);
}
