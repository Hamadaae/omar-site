"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NextIntlClientProvider } from "next-intl";
import { Locale } from "@/i18n/routing";

export function Providers({
	children,
	messages,
	locale,
}: Readonly<{
	children: ReactNode;
	messages: Record<string, any>;
	locale: Locale;
}>) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<NextIntlClientProvider locale={locale} messages={messages}>
				<TooltipProvider>{children}</TooltipProvider>
			</NextIntlClientProvider>
		</ThemeProvider>
	);
}
