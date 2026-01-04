"use client";

import { useState, useEffect } from "react";

import { ModeToggle } from "@/components/theme/ModeToggle";
import MenuButton from "./MenuButton";
import Menu from "./Menu";

// Header Component
export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<>
			<header
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${
			isScrolled
				? "bg-background/80 backdrop-blur-sm border-b border-border-subtle"
				: "bg-background border-b border-transparent"
		}
  `}
			>
				<div className="w-[80%] mx-auto">
					<div className="flex items-center justify-between py-2">
						{/* Logo/Brand */}
						<div className="flex items-center gap-2">
							<div className="w-2.5 h-2.5 bg-foreground rounded-full" />

							<span className="text-lg font-bold uppercase tracking-tight text-foreground">
								Dominic
							</span>
						</div>

						<div className="flex items-center gap-3">
							<ModeToggle />
							{/* Menu Button */}
							<MenuButton
								isOpen={isMenuOpen}
								onClick={() => setIsMenuOpen(!isMenuOpen)}
							/>
						</div>
					</div>
				</div>
			</header>

			{/* Menu */}
			<Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
		</>
	);
}
