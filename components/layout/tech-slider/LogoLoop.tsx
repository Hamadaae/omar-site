"use client";

import React, {
	CSSProperties,
	ReactNode,
	useRef,
	useEffect,
	useCallback,
	useMemo,
	useState,
} from "react";
import Image from "next/image";

export interface LogoItem {
	src: string;
	alt?: string;
	id?: string; // NEW: stable key support
	[key: string]: unknown;
}

interface CssLogoLoopProps {
	logos: LogoItem[];
	direction?: "up" | "down";
	speed?: number;
	renderItem?: (item: LogoItem, index: number) => ReactNode;
	className?: string;
	isPaused: boolean;
}

export function CssLogoLoop({
	logos,
	direction = "up",
	speed = 20,
	renderItem,
	className = "",
	isPaused,
}: Readonly<CssLogoLoopProps>) {
	const sequenceRef = useRef<HTMLUListElement>(null);
	const [sequenceHeight, setSequenceHeight] = useState(0);

	// Measure the height of ONE sequence
	const measureHeight = useCallback(() => {
		const el = sequenceRef.current;
		if (!el) return;

		const height = el.offsetHeight;
		if (height > 0) setSequenceHeight(height);
	}, []);

	useEffect(() => {
		if (!sequenceRef.current) return;

		measureHeight();

		const observer = new ResizeObserver(measureHeight);
		observer.observe(sequenceRef.current);

		return () => observer.disconnect();
	}, [measureHeight]);

	const animationVars = useMemo<React.CSSProperties>(
		() =>
			({
				"--animation-duration": `${speed}s`,
				"--sequence-height": `${sequenceHeight}px`,
				"--animation-direction":
					direction === "up" ? "scroll-up" : "scroll-down",
				"--animation-play-state": isPaused ? "paused" : "running",
			} as CSSProperties),
		[direction, speed, sequenceHeight, isPaused]
	);

	const isReady = sequenceHeight > 0;

	const renderSequence = (isPrimary = false) => (
		<ul
			ref={isPrimary ? sequenceRef : undefined}
			className="flex flex-col shrink-0"
			aria-hidden={!isPrimary}
		>
			{logos.map((item, index) => (
				<li key={item.id ?? item.src} className="shrink-0">
					{renderItem ? (
						renderItem(item, index)
					) : (
						<Image src={item.src} alt={item.alt ?? ""} fill />
					)}
				</li>
			))}
		</ul>
	);

	return (
		<div
			className={`relative overflow-hidden h-full ${className}`}
			style={{
				maskImage:
					"linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
				WebkitMaskImage:
					"linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
				...animationVars,
			}}
		>
			<div
				className={`flex flex-col w-full will-change-transform ${
					isReady ? "animate-marquee-vertical" : ""
				}`}
			>
				{renderSequence(true)}
				{renderSequence()}
				{renderSequence()}
			</div>
		</div>
	);
}
