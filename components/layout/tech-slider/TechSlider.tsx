"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import { MICROSOFT_LOGOS } from "@/data/microsoft-logos";
import { AnimateIn } from "./AnimateIn";
import { DecorativeFrame } from "./DecorativeFrame";

/**
 * Smooth, continuous marquee-like slider.
 * - Uses requestAnimationFrame for smooth motion.
 * - Duplicates the logo set for seamless looping.
 * - Keeps existing dots and allows jumping to a slide.
 *
 * Note: this file updates transform via ref for fluid animation.
 */

const SMOOTH_SPEED_PX_PER_SEC = 60; // tweak to make motion faster/slower

export function TechSlider() {
	const logos = MICROSOFT_LOGOS;
	const loopLogos = useMemo(() => [...logos, ...logos], [logos]);

	const outerRef = useRef<HTMLDivElement | null>(null);
	const innerRef = useRef<HTMLDivElement | null>(null);

	const offsetRef = useRef(0);
	const widthOneCycleRef = useRef(0);
	const rafRef = useRef<number | null>(null);
	const lastTsRef = useRef<number | null>(null);
	const [isReady, setIsReady] = useState(false);

	// Measure inner width and initialize
	useEffect(() => {
		const inner = innerRef.current;
		if (!inner) return;

		const measureAndStart = () => {
			// The inner track width with all items (includes the duplicate set)
			widthOneCycleRef.current = inner.scrollWidth / 2;
			offsetRef.current = 0;
			inner.style.transform = `translateX(-${offsetRef.current}px)`;
			setIsReady(true);
		};

		measureAndStart();
		window.addEventListener("resize", measureAndStart);
		return () => window.removeEventListener("resize", measureAndStart);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [logos.length]);

	// RAF loop
	useEffect(() => {
		const inner = innerRef.current;
		if (!inner) return;

		const step = (ts: number) => {
			if (lastTsRef.current == null) lastTsRef.current = ts;
			const dt = Math.min(100, ts - lastTsRef.current); // clamp to avoid jumps on tab switch
			lastTsRef.current = ts;

			const delta = (SMOOTH_SPEED_PX_PER_SEC * dt) / 1000;
			offsetRef.current += delta;

			const cycleWidth = widthOneCycleRef.current || inner.scrollWidth / 2 || 0;
			if (cycleWidth > 0) {
				// wrap when reaching one sequence width
				if (offsetRef.current >= cycleWidth) {
					offsetRef.current = offsetRef.current - cycleWidth;
				}
				inner.style.transform = `translateX(-${offsetRef.current}px)`;
			}

			rafRef.current = requestAnimationFrame(step);
		};

		rafRef.current = requestAnimationFrame(step);
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			rafRef.current = null;
			lastTsRef.current = null;
		};
	}, [isReady]);

	// compute item width so that the original sequence spans 100% of outer width.
	// each item's width = calc(100% / logos.length)
	const itemWidthClass = `w-[calc(100%/${logos.length})] flex-shrink-0`;

	return (
		<AnimateIn className="w-full md:max-w-xl lg:max-w-2xl relative">
			<DecorativeFrame />

			{/* Title */}
			<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold capitalize text-foreground mb-3">
				Microsoft Cloud Technologies
			</h2>

			{/* Subtitle */}
			<h3 className="text-sm sm:text-base md:text-lg max-w-xl mb-4 md:mb-6 text-muted-foreground">
				These are the Microsoft cloud services and platforms I work with daily.
			</h3>

			{/* Paragraph */}
			<p className="text-base sm:text-lg leading-relaxed mb-8 text-muted-foreground">
				I specialize in leveraging Microsoft&apos;s cloud ecosystem to build
				secure, scalable, and enterprise-grade solutions. From identity
				management to cloud infrastructure, I&apos;m constantly exploring new
				services to deliver robust business applications.
			</p>

			{/* Slider Container */}
			<div
				className="relative overflow-hidden rounded-lg bg-surface border border-border p-6"
				aria-live="polite"
				aria-label="Microsoft technologies slider"
			>
				{/* moving track */}
				<div ref={outerRef} className="w-full" aria-hidden="false">
					<div
						ref={innerRef}
						className="flex items-center gap-4 will-change-transform"
						// transform is driven by RAF on the ref for best smoothness
					>
						{loopLogos.map((logo, idx) => (
							<div
								key={idx}
								className={`${itemWidthClass} flex items-center justify-center`}
							>
								<Image
									src={logo.src}
									alt={logo.name}
									width={72}
									height={72}
									className="w-16 h-16 md:w-20 md:h-20 object-contain grayscale hover:grayscale-0 transition-transform duration-300 ease-[cubic-bezier(0.22,0.9,0.34,1)] opacity-70 hover:opacity-100"
								/>
							</div>
						))}
					</div>
				</div>

				{/* Navigation Dots removed for cleaner UI */}
			</div>
		</AnimateIn>
	);
}

export default TechSlider;
