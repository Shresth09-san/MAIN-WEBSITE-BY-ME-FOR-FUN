import { Truck, Clock, CheckCircle, Wallet, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

const features = [
	{
		icon: Truck,
		title: "Fast Delivery",
		description:
			"Fast & professional delivery services. Reliable and efficient solutions for your needs.",
	},
	{
		icon: Clock,
		title: "24hrs Services",
		description:
			"Round-the-clock availability. We're here whenever you need assistance.",
	},
	{
		icon: Globe,
		title: "Wide Service Coverage",
		description: "Extensive service area coverage. Available wherever you are.",
	},
	{
		icon: CheckCircle,
		title: "Quality Assured",
		description:
			"Guaranteed satisfaction with every service. High standards maintained.",
	},
	{
		icon: Wallet,
		title: "Affordable Pricing",
		description:
			"Competitive rates without hidden charges. Best value for your money.",
	},
	{
		icon: Globe,
		title: "Wide Service Coverage",
		description: "Extensive service area coverage. Available wherever you are.",
	},
];

export const Features = () => {
	const { theme } = useTheme();

	const bgColor = theme === "dark" ? "bg-black" : "bg-gray-100";
	const textColor = theme === "dark" ? "text-white" : "text-gray-900";
	const mutedColor = theme === "dark" ? "text-zinc-400" : "text-zinc-600";
	const cardBg = theme === "dark" ? "bg-zinc-900" : "bg-white";
	const borderColor =
		theme === "dark" ? "border-amber-500/20" : "border-amber-500/30";

	return (
		<>
			<section className={`relative ${bgColor} py-24`} id="features">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="inline-block text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-transparent bg-clip-text pb-2">
							Why Choose Us
						</h2>
						<div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mt-2"></div>
						<p className={`max-w-2xl mx-auto mt-6 text-lg ${mutedColor}`}>
							We deliver excellence through attention to detail and commitment to
							quality. Our services are designed to exceed expectations every time.
						</p>
					</div>

					<div className="grid lg:grid-cols-12 gap-12 items-center">
						<div className="lg:col-span-5 space-y-8">
							<div
								className={`space-y-6 ${cardBg} rounded-2xl p-8 shadow-xl border ${borderColor}`}
							>
								<div className="inline-block p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-md">
									<CheckCircle className="w-8 h-8 text-white" />
								</div>
								<h3 className={`text-2xl font-bold ${textColor}`}>
									Premium Service Guarantee
								</h3>
								<p className={mutedColor}>
									Your home deserves a service that understands its importance,
									providing care and attention that ensures it remains a source
									of comfort and warmth. We focus on creating a seamless
									experience that brings peace of mind and supports the everyday
									harmony of your living space.
								</p>
								<div className="pt-4">
									<Button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all px-8 py-6 rounded-xl text-lg">
										View Special Offers
									</Button>
								</div>
							</div>
						</div>

						<div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
							{features.map((feature, index) => (
								<div
									key={index}
									className={`p-6 rounded-xl shadow-lg hover:shadow-2xl border-t-4 border-amber-500 transform hover:-translate-y-2 transition-all duration-300 flex flex-col h-full ${cardBg}`}
								>
									<div className="mb-5">
										<div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-md">
											<feature.icon className="w-6 h-6 text-white" />
										</div>
									</div>
									<h3 className={`text-xl font-bold mb-3 ${textColor}`}>
										{feature.title}
									</h3>
									<p className={`flex-grow ${mutedColor}`}>
										{feature.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className={bgColor}>
				<div className="container mx-auto px-4 py-16">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
						<div
							className={`p-6 rounded-xl shadow-lg ${
								theme === "dark" ? "bg-white/10" : "bg-black/5"
							} backdrop-blur-sm`}
						>
							<div className={`text-5xl font-bold mb-2 ${textColor}`}>20K</div>
							<div
								className={`text-lg uppercase tracking-wider ${textColor}`}
							>
								Satisfied Clients
							</div>
						</div>

						<div
							className={`p-6 rounded-xl shadow-lg ${
								theme === "dark" ? "bg-white/10" : "bg-black/5"
							} backdrop-blur-sm`}
						>
							<div className={`text-5xl font-bold mb-2 ${textColor}`}>30K</div>
							<div
								className={`text-lg uppercase tracking-wider ${textColor}`}
							>
								Services Given
							</div>
						</div>

						<div
							className={`p-6 rounded-xl shadow-lg ${
								theme === "dark" ? "bg-white/10" : "bg-black/5"
							} backdrop-blur-sm`}
						>
							<div className={`text-5xl font-bold mb-2 ${textColor}`}>99%</div>
							<div
								className={`text-lg uppercase tracking-wider ${textColor}`}
							>
								Client Satisfaction
							</div>
						</div>

						<div
							className={`p-6 rounded-xl shadow-lg ${
								theme === "dark" ? "bg-white/10" : "bg-black/5"
							} backdrop-blur-sm`}
						>
							<div className={`text-5xl font-bold mb-2 ${textColor}`}>300+</div>
							<div
								className={`text-lg uppercase tracking-wider ${textColor}`}
							>
								Expert Professionals
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
