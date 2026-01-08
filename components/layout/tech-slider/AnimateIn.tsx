import { ReactNode } from "react";

interface AnimateInProps {
	children: ReactNode;
	className?: string;
}

export function AnimateIn({
	children,
	className = "",
}: Readonly<AnimateInProps>) {
	return <div className={`animate-in ${className}`}>{children}</div>;
}
