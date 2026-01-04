import { z } from "zod";

// Zod schema with comprehensive validation
export const contactFormSchema = z.object({
	fullName: z
		.string()
		.min(2, "Full name must be at least 2 characters")
		.max(100, "Full name must be less than 100 characters")
		.regex(/^[a-zA-Z\s]+$/, "Full name should only contain letters and spaces"),

	email: z.email("Please enter a valid email address").toLowerCase(),

	phone: z
		.string()
		.optional()
		.refine(
			(val) => !val || /^[\d\s\-+()]+$/.test(val),
			"Please enter a valid phone number"
		),

	subject: z
		.string()
		.min(5, "Subject must be at least 5 characters")
		.max(200, "Subject must be less than 200 characters"),

	message: z
		.string()
		.min(10, "Message must be at least 10 characters")
		.max(600, "Message must be less than 600 characters"),
});
