import TextType from "@/components/ui/TextType";

export default function RolesSlider() {
	const roles = [
		"Office Support",
		"Security Engineer",
		"Azure specialist",
		"power apps specialist",
	];

	return (
		<div className="flex items-start relative w-full h-full">
			{/* Replace the old role mapping logic with the TextType component.
        This uses the typing and deleting animation defined in your TextType.tsx.
        
        The container div's height (h-full) is critical because the parent component 
        (HeroSection) gives it a fixed height (h-32) to contain the changing text.
      */}
			<div className="relative w-full h-full">
				{/* The TextType component will now handle the cycling/animation */}
				<TextType
					// Pass the array of roles as the text prop
					text={roles}
					// Use a large font size to match the original style (e.g., in a span or div)
					as="span"
					className="text-4xl lg:text-6xl font-bold italic capitalize leading-tight"
					// Configure the animation timings
					typingSpeed={75} // Speed of typing (ms per char)
					pauseDuration={2500} // Pause before deleting (ms) - slightly less than 5000ms interval for effect
					deletingSpeed={30} // Speed of deleting (ms per char)
					loop={true} // Cycle through the roles continuously
					showCursor={true}
					cursorCharacter="_" // A common character for a coding context
				/>
			</div>
		</div>
	);
}
