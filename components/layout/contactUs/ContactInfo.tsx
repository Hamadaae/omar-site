import { PiMicrosoftTeamsLogo } from "react-icons/pi";
import { FaUpwork } from "react-icons/fa6";
import { SiFiverr } from "react-icons/si";

function ContactInfo() {
	return (
		<div className="flex flex-col justify-center">
			<h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-foreground capitalize">
				contact me
			</h2>

			<p className="text-muted-foreground text-md my-3">
				Email: <br />
				<span className="text-lg">
					<strong>marwanabdalmagied@gmail.com</strong>
				</span>
			</p>
			<p className="text-muted-foreground text-lg my-3">
				you can find me in:{" "}
				<span className="flex gap-6 text-2xl">
					<PiMicrosoftTeamsLogo />
					<FaUpwork />
					<SiFiverr />
				</span>
			</p>
			<p className="text-muted-foreground text-md my-3">
				working hours: <br />
				<span>
					monday - friday <br /> 7 AM - 3 PM UTC
				</span>
			</p>
		</div>
	);
}

export default ContactInfo;
