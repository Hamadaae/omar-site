import { PiMicrosoftTeamsLogo } from "react-icons/pi";
import { FaUpwork } from "react-icons/fa6";
import { SiFiverr } from "react-icons/si";
import { getTranslations } from "next-intl/server";

async function ContactInfo() {
	const t = await getTranslations("Contact");

	return (
		<div className="flex flex-col justify-center">
			<h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-foreground capitalize">
				{t("heading")}
			</h2>

			<p className="text-muted-foreground text-md my-3">
				{t("email")} <br />
				<span className="text-lg">
					<strong>marwanabdalmagied@gmail.com</strong>
				</span>
			</p>
			<p className="text-muted-foreground text-lg my-3">
				{t("locations")}{" "}
				<span className="flex gap-6 text-2xl">
					<PiMicrosoftTeamsLogo />
					<FaUpwork />
					<SiFiverr />
				</span>
			</p>
			<p className="text-muted-foreground text-md my-3">
				{t("workingHours")} <br />
				<span>{t("hours")}</span>
			</p>
		</div>
	);
}

export default ContactInfo;
