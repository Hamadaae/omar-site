"use client";

// MenuButton Component
export default function MenuButton({
	isOpen,
	onClick,
}: Readonly<{ isOpen: boolean; onClick: () => void }>) {
	return (
		<button
			onClick={onClick}
			className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
			aria-label={isOpen ? "Close menu" : "Open menu"}
		>
			<span className="text-xs uppercase tracking-wider font-medium">Menu</span>
			<div className="w-5 h-4 flex flex-col justify-between">
				<span
					className={`w-full h-0.5 bg-white transition-all duration-300 ${
						isOpen ? "rotate-45 translate-y-1.5" : ""
					}`}
				/>
				<span
					className={`w-full h-0.5 bg-white transition-all duration-300 ${
						isOpen ? "opacity-0" : ""
					}`}
				/>
				<span
					className={`w-full h-0.5 bg-white transition-all duration-300 ${
						isOpen ? "-rotate-45 -translate-y-2" : ""
					}`}
				/>
			</div>
		</button>
	);
}
