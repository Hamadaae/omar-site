export default function CraftingSection() {
	return (
		<section className="bg-surface-subtle">
			<div className="max-w-350 mx-auto px-6 lg:px-12 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
					{/* Left – Headline */}
					<h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
						Crafting meaningful
						<br />
						brands & intuitive
						<br />
						experiences
					</h2>

					{/* Right – Text */}
					<div className="space-y-6 text-muted-foreground max-w-prose">
						<p>
							Hey, I’m Solt, a UI/UX and brand designer passionate about
							creating visually compelling and user-friendly digital
							experiences.
						</p>

						<p>
							With a keen eye for aesthetics and a deep understanding of user
							behavior, I design brands and interfaces that not only look great
							but also resonate with audiences.
						</p>

						<p>
							Whether it’s building a brand identity from the ground up or
							refining a digital product for seamless usability, I blend
							strategy, creativity, and functionality to bring ideas to life.
							Let’s collaborate and make something extraordinary.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
