"use client";

import { useCallback, useMemo, useState } from "react";
import { MICROSOFT_LOGOS } from "@/data/microsoft-logos";
import { AnimateIn } from "./AnimateIn";
import { DecorativeFrame } from "./DecorativeFrame";
import { CssLogoLoop, LogoItem } from "./LogoLoop";
import TechLogo from "./TechLogo";

type SliderIndex = 0 | 1;

export function TechSlider() {
	// scalable pause state
	const [paused, setPaused] = useState<Record<SliderIndex, boolean>>({
		0: false,
		1: false,
	});

	const logoItems = useMemo<LogoItem[]>(
		() =>
			MICROSOFT_LOGOS.map((logo) => ({
				src: logo.src,
				alt: logo.name,
			})),
		[]
	);

	const setSliderPaused = useCallback((index: SliderIndex, value: boolean) => {
		setPaused((prev) => ({ ...prev, [index]: value }));
	}, []);

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
			{/* Text Section */}
			<AnimateIn className="relative z-10">
				<DecorativeFrame />

				<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
					Microsoft Cloud Technologies
				</h2>

				<h3 className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6">
					These are the Microsoft cloud services and platforms I work with
					daily.
				</h3>

				<p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
					I specialize in leveraging Microsoft&apos;s cloud ecosystem to build
					secure, scalable, and enterprise-grade solutions.
				</p>
			</AnimateIn>

			{/* Sliders */}
			<div className="h-125 w-full bg-surface/50 border border-border rounded-xl p-4 overflow-hidden relative">
				<div className="absolute inset-0 bg-linear-to-b from-background/10 via-transparent to-background/10 pointer-events-none z-10" />

				<div className="grid grid-cols-2 gap-4 h-full">
					<CssLogoLoop
						logos={logoItems}
						direction="up"
						speed={40}
						isPaused={paused[0]}
						renderItem={(item) => (
							<TechLogo
								item={item}
								onPauseChange={(v) => setSliderPaused(0, v)}
							/>
						)}
					/>

					<CssLogoLoop
						logos={logoItems}
						direction="down"
						speed={55}
						isPaused={paused[1]}
						renderItem={(item) => (
							<TechLogo
								item={item}
								onPauseChange={(v) => setSliderPaused(1, v)}
							/>
						)}
					/>
				</div>
			</div>
		</div>
	);
}

export default TechSlider;
