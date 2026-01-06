"use client";

import { Link, Locale, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const allLocales: Locale[] = ["en", "de"];

const LocaleSwitch = () => {
	const pathname = usePathname();
	const currentLocale = useLocale();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="rounded-xl font-semibold px-[0.54rem] py-[1.1rem] cursor-pointer"
					aria-label="Change language"
				>
					{currentLocale.toUpperCase()}
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="bg-background rounded-2xl">
				{allLocales.map((locale) => (
					<DropdownMenuItem
						key={locale}
						asChild
						className="capitalize cursor-pointer rounded-xl"
						disabled={locale === currentLocale}
					>
						<Link href={pathname} locale={locale} className="w-full">
							{locale.toUpperCase()}
						</Link>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LocaleSwitch;
