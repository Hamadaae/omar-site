"use client";

import { useState, useEffect, ReactNode } from "react";

interface AnimateInProps {
	children: ReactNode;
	className?: string;
}

export function AnimateIn({ children, className = "" }: AnimateInProps) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<div
			className={`transition-all duration-1000 ${
				isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
			} ${className}`}
		>
			{children}
		</div>
	);
}
