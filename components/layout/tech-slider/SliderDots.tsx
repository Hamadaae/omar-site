"use client";

import { Logo } from "@/data/microsoft-logos";

interface SliderDotsProps {
	logos: Logo[];
	currentIndex: number;
	onDotClick: (index: number) => void;
}

export function SliderDots({
	logos,
	currentIndex,
	onDotClick,
}: SliderDotsProps) {
	return (
		<div className="flex justify-center gap-2 mt-6" aria-live="polite">
			{logos.map((logo, index) => (
				<button
					key={logo.name}
					onClick={() => onDotClick(index)}
					className={`w-2 h-2 rounded-full transition-all duration-300 ${
						index === currentIndex
							? "bg-accent opacity-100"
							: "bg-muted opacity-40"
					}`}
					aria-label={`Go to slide ${index + 1}`}
					aria-selected={index === currentIndex}
				/>
			))}
		</div>
	);
}
