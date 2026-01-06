"use client";

import { MailIcon, Tag } from "lucide-react";
import { BsPersonVcard } from "react-icons/bs";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
	InputGroupTextarea,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { contactFormSchema } from "@/zodSchemas/ContactUsForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import z from "zod";

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactFrom() {
	const t = useTranslations("Contact.form");
	const form = useForm<ContactFormValues>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			fullName: "",
			email: "",
			phone: "",
			subject: "",
			message: "",
		},
		mode: "onBlur",
	});

	const messageLength = form.watch("message")?.length || 0;
	const charactersLeft = 600 - messageLength;

	async function onSubmit(data: ContactFormValues) {
		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!response.ok) throw new Error("Failed to send message");

			toast.success("Message sent successfully!");
			form.reset();
		} catch (error) {
			toast.error("Failed to send message. Please try again.");
			console.error(error);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid w-full gap-6 border border-foreground rounded-xl p-5"
			>
				<FormField
					control={form.control}
					name="fullName"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<InputGroup>
									<InputGroupInput
										placeholder={t("fullNamePlaceholder")}
										className="capitalize focus-visible:ring-offset-0 focus-visible:border-primary bg-transparent data-invalid:border-destructive"
										{...field}
									/>
									<InputGroupAddon align="inline-end">
										<BsPersonVcard />
									</InputGroupAddon>
								</InputGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<InputGroup>
										<InputGroupInput
											type="email"
											placeholder={t("emailPlaceholder")}
											className="focus-visible:ring-offset-0 focus-visible:border-primary bg-transparent data-invalid:border-destructive"
											{...field}
										/>
										<InputGroupAddon align="inline-end">
											<MailIcon />
										</InputGroupAddon>
									</InputGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="subject"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<InputGroup>
										<InputGroupInput
											placeholder={t("subjectPlaceholder")}
											className="focus-visible:ring-offset-0 focus-visible:border-primary bg-transparent data-invalid:border-destructive"
											{...field}
										/>
										<InputGroupAddon align="inline-end">
											<Tag />
										</InputGroupAddon>
									</InputGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<InputGroup>
									<InputGroupTextarea
										placeholder={t("messagePlaceholder")}
										className="min-h-10 focus-visible:ring-offset-0 focus-visible:border-primary bg-transparent data-invalid:border-destructive"
										{...field}
									/>
									<InputGroupAddon align="block-end">
										<InputGroupText className="text-muted-foreground text-xs">
											{charactersLeft} {t("charactersLeft")}
										</InputGroupText>
									</InputGroupAddon>
								</InputGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="w-full rounded-full"
					disabled={form.formState.isSubmitting}
				>
					{form.formState.isSubmitting
						? t("submittingButton")
						: t("submitButton")}
				</Button>
			</form>
		</Form>
	);
}
