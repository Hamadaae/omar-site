"use client";

import { useState, useEffect } from "react";

export default function RolesSlider() {
	const roles = [
		"Office Support",
		"Security Engineer",
		"Azure specialist",
		"power apps specialist",
	];

	const [currentRole, setCurrentRole] = useState(0);

	useEffect(() => {
		const roleInterval = setInterval(() => {
			setCurrentRole((prev) => (prev + 1) % roles.length);
		}, 5000);
		return () => clearInterval(roleInterval);
	}, [roles.length]);

	return (
		<div className="flex items-start relative w-full h-full">
			<div className="relative w-full">
				{roles.map((role, index) => (
					<h1
						key={role}
						className={`text-4xl lg:text-6xl font-bold italic capitalize absolute left-0 transition-all duration-700 leading-tight ${
							currentRole === index
								? "opacity-100 translate-y-0"
								: index < currentRole
								? "opacity-0 -translate-y-8"
								: "opacity-0 translate-y-8"
						}`}
						style={{ wordWrap: "break-word", whiteSpace: "normal" }}
					>
						{role}
					</h1>
				))}
			</div>
		</div>
	);
}
