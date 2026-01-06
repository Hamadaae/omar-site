"use client";

import { useTranslations } from "next-intl";
import CardNav, { CardNavProps, CardNavItem } from "@/components/ui/CardNav"; // <--- Import the CardNav component
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

// Header Component (Your new main component)
export default function Header() {
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
		// baseColor: "#4d4d4d", // Use Tailwind CSS background variable
		// menuColor: "#d1d2cc", // Use Tailwind CSS foreground variable
		// buttonBgColor: "#d1d2cc",
		// buttonTextColor: "#0d0d0d",
		className: "bg-foreground rounded-2xl",
	};

	return (
		<header className="fixed top-0 left-0 right-0 z-50">
			<CardNav {...cardNavProps} />
		</header>
	);
}
