"use client";

import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const EMAIL_ADDRESS = "marwanabdalmagied@gmail.com";

const EmailCopyLink = ({ emailLabel }: Readonly<{ emailLabel: string }>) => {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(EMAIL_ADDRESS);
			setIsCopied(true);
			// Reset the "copied" state after 3 seconds
			setTimeout(() => setIsCopied(false), 3000);
		} catch (err) {
			console.error("Failed to copy email:", err);
			// You might want to add a visible error state here
		}
	};

	// The mailto: link functionality
	const mailtoLink = `mailto:${EMAIL_ADDRESS}`;

	return (
		<>
			<p className="text-muted-foreground text-lg mt-3">
				{/* The email label text (e.g., "Email") */}
				{emailLabel}
				<br />
			</p>
			<div className="gap-3 md:gap-6 flex w-full">
				{/* Link to open the default email app */}
				<a
					href={mailtoLink}
					className="text-lg text-foreground hover:underline transition-all"
				>
					<strong>{EMAIL_ADDRESS}</strong>
				</a>
				{/* The Copy Button */}
				<button
					onClick={handleCopy}
					className="px-0.5 rounded-md transition-colors hover:scale-110"
					aria-label={isCopied ? "Email copied" : "Copy email address"}
				>
					{isCopied ? (
						// Display checkmark icon when copied
						<IoCheckmarkDoneSharp className="text-green-500 text-xl" />
					) : (
						// Display copy icon initially
						<FaRegCopy className="text-foreground/70 text-xl" />
					)}
				</button>
			</div>
		</>
	);
};

export default EmailCopyLink;
