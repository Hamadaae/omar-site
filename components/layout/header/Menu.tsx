"use client";

import { useEffect } from "react";

// Menu Component - Responsive
export default function Menu({
	isOpen,
	onClose,
}: Readonly<{ isOpen: boolean; onClose: () => void }>) {
	const menuItems = [
		{ label: "Home", href: "#home" },
		{ label: "About", href: "#about" },
		{ label: "Services", href: "#services" },
		{ label: "Portfolio", href: "#portfolio" },
		{ label: "Experience", href: "#experience" },
		{ label: "Contact", href: "#contact" },
	];

	useEffect(() => {
		if (isOpen && window.innerWidth < 768) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	return (
		<>
			{/* Backdrop - Mobile only */}
			<button
				className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
					isOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				}`}
				onClick={onClose}
			/>

			{/* Menu Panel */}
			<div
				className={`fixed right-0 top-0 h-full bg-surface z-40 transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          w-full md:w-96 md:top-24 md:h-auto md:rounded-l-2xl md:shadow-2xl md:bg-background
        `}
			>
				<nav className="flex-1 flex items-center justify-center md:items-start md:justify-start md:py-8">
					<ul className="space-y-8 md:space-y-4 text-center md:text-left w-full md:px-8">
						{menuItems.map((item, index) => (
							<li
								key={item.href}
								className={`transform transition-all duration-500 ${
									isOpen
										? "translate-x-0 opacity-100"
										: "translate-x-8 opacity-0"
								}`}
								style={{ transitionDelay: `${index * 50}ms` }}
							>
								<a
									href={item.href}
									onClick={onClose}
									className="text-primary text-3xl md:text-2xl font-bold hover:text-muted-foreground transition-colors inline-block md:block md:py-3"
								>
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</>
	);
}
