import { getTranslations } from "next-intl/server";

export default async function CraftingSection() {
	const t = await getTranslations("Crafting");

	return (
		<section className="bg-surface-subtle">
			<div className="max-w-350 mx-auto px-6 lg:px-12 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
					{/* Left – Headline */}
					<h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
						{t("heading")}
					</h2>

					{/* Right – Text */}
					<div className="space-y-6 text-muted-foreground max-w-prose">
						<p>{t("bio.0")}</p>

						<p>{t("bio.1")}</p>

						<p>{t("bio.2")}</p>
					</div>
				</div>
			</div>
		</section>
	);
}
