"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Theme = "light" | "dark" | "system";
const allThemes: Theme[] = ["light", "dark", "system"];
export function ModeToggle() {
	const { setTheme, theme: currentTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="rounded-xl cursor-pointer"
				>
					<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 dark:scale-0 dark:-rotate-90" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="bg-background rounded-2xl">
				{allThemes.map((theme) => (
					<DropdownMenuItem
						key={theme}
						onClick={() => setTheme(theme)}
						className="capitalize cursor-pointer rounded-xl"
						disabled={theme === currentTheme}
					>
						{theme}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
