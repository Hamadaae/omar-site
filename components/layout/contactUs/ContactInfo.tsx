import { PiMicrosoftTeamsLogo } from "react-icons/pi";
import { FaUpwork } from "react-icons/fa6";
import { SiFiverr } from "react-icons/si";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import EmailCopyLink from "../EmailCopyLink";
import { JSX } from "react";

interface IconLink {
	name: string;
	icon: JSX.Element;
	link: string;
}

const iconsAndLinks: IconLink[] = [
	{
		name: "Microsoft Teams",
		icon: <PiMicrosoftTeamsLogo />,
		link: "https://teams.microsoft.com/l/chat/0/0?users=omar@mstack360.com",
	},
	{
		name: "Upwork",
		icon: <FaUpwork />,
		link: "https://upwork.com/freelancers/~01d18de3fb358c0b61?mp_source=share",
	},
	{
		name: "Fiverr",
		icon: <SiFiverr />,
		link: "https://www.fiverr.com/omarabdalmagied",
	},
];

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
				<span className="flex gap-6 text-2xl mt-2">
					{iconsAndLinks.map((link) => (
						<Link
							key={link.name}
							href={link.link}
							target="_blank"
							rel="noopener noreferrer"
						>
							{link.icon}
						</Link>
					))}
				</span>
			</p>
			<p className="text-muted-foreground text-md my-3">
				{t("workingHours")}
				<br />
				<span className="text-foreground">
					<span>{t("days")}</span>
					<br />
					<span>{t("hours")}</span>
				</span>
			</p>
		</div>
	);
};

export default ContactInfo;
