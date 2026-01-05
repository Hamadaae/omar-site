"use client";

import { useTranslations } from "next-intl";
import { ModeToggle } from "@/components/theme/ModeToggle";
import LocaleSwitch from "../LocaleSwitch";
import CardNav, { CardNavProps, CardNavItem } from "@/components/ui/CardNav"; // <--- Import the CardNav component
import { GoArrowUpRight } from "react-icons/go"; // Assuming you kept the react-icons dependency

// A simple placeholder array for your actual navigation content
const navItems: CardNavItem[] = [
	{
		label: "Services",
		bgColor: "#2E5559", // Dark Teal
		textColor: "#F0F0F0", // Light Gray
		links: [
			{
				label: "Web Development",
				href: "/services/web",
				ariaLabel: "Go to Web Development services",
			},
			{
				label: "Mobile Apps",
				href: "/services/mobile",
				ariaLabel: "Go to Mobile App services",
			},
			{
				label: "Consulting",
				href: "/services/consulting",
				ariaLabel: "Go to Consulting services",
			},
		],
	},
	{
		label: "About Us",
		bgColor: "#7F4F24", // Burnt Orange/Brown
		textColor: "#F0F0F0",
		links: [
			{
				label: "Our Story",
				href: "/about/story",
				ariaLabel: "Learn about our story",
			},
			{ label: "Team", href: "/about/team", ariaLabel: "Meet the team" },
			{
				label: "Careers",
				href: "/about/careers",
				ariaLabel: "See job openings",
			},
		],
	},
	{
		label: "Resources",
		bgColor: "#52485C", // Deep Purple
		textColor: "#F0F0F0",
		links: [
			{ label: "Blog", href: "/blog", ariaLabel: "Read our blog" },
			{
				label: "Case Studies",
				href: "/case-studies",
				ariaLabel: "View case studies",
			},
			{
				label: "FAQ",
				href: "/faq",
				ariaLabel: "Find answers to frequently asked questions",
			},
		],
	},
];

// Define a placeholder for your logo image path
// You should replace this with the actual path to your logo image file.
const LOGO_IMAGE_PATH = "/path/to/your/logo.svg";

// --- Helper to adapt react-bits component for your needs ---

// NOTE: We wrap CardNav inside a new component to pass the required props
// and incorporate your other header elements (ModeToggle, LocaleSwitch).
const CustomCardNavWrapper = () => {
	const t = useTranslations("Header");

	// If you don't have a logo image, you can use a placeholder for now
	if (LOGO_IMAGE_PATH === "/path/to/your/logo.svg") {
		console.warn("Please update LOGO_IMAGE_PATH in Header.tsx");
	}

	const cardNavProps: CardNavProps = {
		logo: LOGO_IMAGE_PATH,
		logoAlt: t("brand"),
		items: navItems,
		// Customization props (optional):
		baseColor: "black", // Use Tailwind CSS background variable
		menuColor: "bg-foreground", // Use Tailwind CSS foreground variable
		buttonBgColor: "white",
		buttonTextColor: "black",
	};

	return (
		// The default CardNav component is ABSOLUTELY positioned and centered (top-[1.2em]).
		// We add your other controls here.
		// <div className="flex w-[80%] mx-auto py-2 items-center justify-end relative z-50">
		// 	<div className="flex items-center justify-center gap-3">
		// 		<LocaleSwitch />
		// 		<ModeToggle />
		// 	</div>
		<CardNav {...cardNavProps} />
		// </div>
	);
};

// Header Component (Your new main component)
export default function Header() {
	// NOTE: If you want the CardNav to be FIXED and FULL-WIDTH
	// like your old header, you will need to significantly modify
	// the positioning and styling within the CardNav component itself.
	// For this migration, we are keeping its default centered, floating style.

	// Optional: Re-introduce the scroll class if you want a fixed *top* element
	// *around* the CardNav component, but the CardNav itself is built to float.

	return (
		<header className="fixed top-0 left-0 right-0 z-50">
			<CustomCardNavWrapper />
		</header>
	);
}
