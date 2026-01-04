import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import { Providers } from "../Providers";
import "../globals.css";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, routing } from "@/i18n/routing";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Omar AbdelMagied",
	description: "Omar AbdelMagied's Portfolio",
};

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: ReactNode;
	params: Promise<{ locale: Locale }>;
}>) {
	// Ensure that the incoming `locale` is valid
	const { locale } = await params; // Awaiting params is required in Next.js 15+

	if (!routing.locales.includes(locale)) {
		notFound();
	}

	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers locale={locale} messages={messages}>
					{children}
				</Providers>
			</body>
		</html>
	);
}
