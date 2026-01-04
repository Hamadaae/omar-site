import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

function BookAppointment() {
	const t = useTranslations("Contact.appointment");

	return (
		<div className="flex flex-col items-center gap-4 border p-6 rounded-xl w-full justify-center">
			<Calendar className="w-12 h-12 text-muted-foreground" />
			<h3 className="text-xl font-semibold">{t("heading")}</h3>
			<p className="text-center text-muted-foreground text-sm">
				{t("description")}
			</p>
			<Button asChild className="rounded-full w-full">
				<a
					href="https://outlook.office.com/book/MitOmar@mstack360.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					{t("button")}
				</a>
			</Button>
		</div>
	);
}

export default BookAppointment;
