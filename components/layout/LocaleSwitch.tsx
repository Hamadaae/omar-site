"use client";

import { Link, Locale, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl"; // <-- Import useLocale from next-intl

// Define the two locales we support (Matches the routing.ts file)
const allLocales = ["en", "de"];

/**
 * A client component to switch the active locale.
 */
export default function LocaleSwitch() {
	const currentPathname = usePathname();
	const currentLocale = useLocale(); // <-- Get the currently active locale ('en' or 'de')

	// Find the target locale (the one not currently active)
	const targetLocale = allLocales.find(
		(locale) => locale !== currentLocale
	) as Locale;

	// Define the label for the button
	const targetLabel = targetLocale.toUpperCase();

	return (
		<Link
			href={currentPathname}
			locale={targetLocale} // Set the target locale here
			aria-label={`Switch language to ${targetLabel}`}
			// Added a key to force re-render if needed, though Link usually handles this
			key={currentLocale}
			className="text-sm font-semibold bg-background text-foreground/80 hover:text-foreground transition-colors p-2 rounded-md border border-border-subtle"
		>
			{/* Display the label of the language we are switching TO */}
			{targetLabel}
		</Link>
	);
}
