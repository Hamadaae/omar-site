import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactFrom from "./ContactFrom";
import BookAppointment from "./BookAppointment";
import ContactInfo from "./ContactInfo";
import { getTranslations } from "next-intl/server";

export default async function ContactUs() {
	const t = await getTranslations("Contact.tabs");

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-3 my-10 lg:gap-6">
			{/* left side */}
			<ContactInfo />

			{/* right side */}
			<Tabs defaultValue="message">
				<div className="flex items-center">
					<TabsList className="mx-auto rounded-full border border-foreground mb-6">
						<TabsTrigger value="message" className="rounded-full">
							{t("message")}
						</TabsTrigger>
						<TabsTrigger value="appointment" className="rounded-full">
							{t("appointment")}
						</TabsTrigger>
					</TabsList>
				</div>
				{/* book appointment */}
				<TabsContent value="appointment">
					<BookAppointment />
				</TabsContent>
				{/* form */}
				<TabsContent value="message">
					<ContactFrom />
				</TabsContent>
			</Tabs>
		</div>
	);
}
