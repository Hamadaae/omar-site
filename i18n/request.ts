import { getRequestConfig } from "next-intl/server";
import { Locale, routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
	// This typically corresponds to the `[locale]` segment
	let locale = (await requestLocale) as Locale;

	// Ensure that the incoming locale is valid
	if (!locale || !routing.locales.includes(locale)) {
		locale = routing.defaultLocale;
	}

	return {
		locale,
		messages: (await import(`../messages/${locale}.json`)).default,
	};
});
