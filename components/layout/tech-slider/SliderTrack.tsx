"use client";

import Image from "next/image";
import { Logo } from "@/data/microsoft-logos";

interface SliderTrackProps {
	visibleLogos: Logo[];
	currentIndex: number;
}

export function SliderTrack({ visibleLogos, currentIndex }: SliderTrackProps) {
	return (
		<div className="flex items-center justify-between gap-4">
			{visibleLogos.map((logo, index) => (
				<div
					key={`${logo.name}-${currentIndex}-${index}`}
					className="flex-1 flex items-center justify-center animate-fade-in"
				>
					<Image
						src={logo.src}
						alt={logo.name}
						width={65}
						height={65}
						className="w-16 h-16 md:w-20 md:h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-110"
					/>
				</div>
			))}
		</div>
	);
}
