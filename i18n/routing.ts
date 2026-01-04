import { defineRouting } from "next-intl/routing";
// import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const routing = defineRouting({
	// A list of all locales that are supported
	locales: ["en", "de"],

	// Used when no locale matches
	defaultLocale: "en",

	// Option B: Always show the locale prefix (e.g. /en/about and /de/about)
	localePrefix: "always",
});

// // Lightweight wrappers around Next.js' navigation APIs
// export const { Link, redirect, usePathname, useRouter } =
// 	createSharedPathnamesNavigation(routing);

export type Locale = (typeof routing.locales)[number];
