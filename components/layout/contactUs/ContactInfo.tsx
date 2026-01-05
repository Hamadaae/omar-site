import { PiMicrosoftTeamsLogo } from "react-icons/pi";
import { FaUpwork } from "react-icons/fa6";
import { SiFiverr } from "react-icons/si";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import EmailCopyLink from "../EmailCopyLink";

const ContactInfo = async () => {
	const t = await getTranslations("Contact");

	return (
		<div className="flex flex-col justify-center">
			<h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-foreground capitalize">
				{t("heading")}
			</h2>

			<EmailCopyLink emailLabel={t("email")} />

			<p className="text-muted-foreground text-lg my-3">
				{t("locations")}{" "}
				<span className="flex gap-6 ml-12 text-2xl">
					<Link
						href={""}
						target="_blank"
						className="hover:scale-115 mouse-pointer"
					>
						<PiMicrosoftTeamsLogo />
					</Link>
					<Link
						href={
							"https://www.upwork.com/freelancers/~01fc9ca62a615e2f41?mp_source=share"
						}
						target="_blank"
						className="hover:scale-115 mouse-pointer"
					>
						<FaUpwork />
					</Link>
					<Link
						href={""}
						target="_blank"
						className="hover:scale-115 mouse-pointer"
					>
						<SiFiverr />
					</Link>
				</span>
			</p>
			<p className="text-muted-foreground text-md my-3">
				{t("workingHours")}
				<p className="ml-12">{t("days")}</p>
				<p className="ml-12">{t("hours")}</p>
			</p>
		</div>
	);
};

export default ContactInfo;
