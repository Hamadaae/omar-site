import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactFrom from "./ContactFrom";
import BookAppointment from "./BookAppointment";
import ContactInfo from "./ContactInfo";

export default function ContactUs() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-3 my-10 lg:gap-6">
			{/* left side */}
			<ContactInfo />

			{/* right side */}
			<Tabs defaultValue="message">
				<div className="flex items-center">
					<TabsList className="mx-auto rounded-full">
						<TabsTrigger value="message" className="rounded-full">
							Send a Message
						</TabsTrigger>
						<TabsTrigger value="appointment" className="rounded-full">
							Book Appointment
						</TabsTrigger>
					</TabsList>
				</div>
				{/* book appointment */}
				<TabsContent value="appointment" className="mt-6">
					<BookAppointment />
				</TabsContent>
				{/* form */}
				<TabsContent value="message" className="mt-6">
					<ContactFrom />
				</TabsContent>
			</Tabs>
		</div>
	);
}
