import React from "react";
import { useNavigate } from "react-router-dom";
import {
	BarChart3,
	Smartphone,
	Building,
	Users,
	CreditCard,
	ClipboardList,
	CheckCircle,
} from "lucide-react";

function LandingPage() {
	const navigate = useNavigate();
	return (
		<div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans">
			{/* HERO */}
			<section className="text-center py-20 px-6 bg-[var(--color-card)] shadow-sm">
				<h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-[var(--color-brand-primary)] dark:text-[var(--color-brand-accent)]">
					Digitizing County Markets in Kenya
				</h2>
				<p className="max-w-2xl mx-auto mb-6 text-lg">
					SokoTrack helps counties manage stalls, boost revenue, and empower
					vendors with transparency.
				</p>
				<div className="flex justify-center gap-4">
					<button
						onClick={() => navigate("/auth/register")}
						className="bg-[var(--color-brand-secondary)] text-[var(--color-text-contrast)] px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
						Register
					</button>
					<button
						onClick={() => navigate("/auth/login")}
						className="border border-[var(--color-brand-accent)] text-[var(--color-brand-accent)] px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-brand-accent)] hover:text-[var(--color-text-contrast)] transition">
						Login
					</button>
				</div>
			</section>

			{/* PROBLEM */}
			<section id="about" className="py-16 px-6 text-center">
				<h3 className="font-heading text-3xl font-bold mb-6">
					Market management is broken
				</h3>
				<ul className="max-w-2xl mx-auto space-y-3 text-lg">
					<li>Manual stall allocation</li>
					<li>Revenue leakages</li>
					<li>Lost county income</li>
					<li>Vendors lack fair access to stalls</li>
					<li>No real-time visibility for officials</li>
				</ul>
			</section>

			{/* SOLUTION */}
			<section
				id="features"
				className="py-16 px-6 bg-[var(--color-card)] shadow-sm">
				<h3 className="font-heading text-3xl font-bold mb-10 text-center">
					Why Counties Choose SokoTrack
				</h3>
				<div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
					{/* Governments */}
					<div className="bg-[var(--color-bg)] rounded-2xl shadow-md p-6 border border-[var(--color-border)]">
						<h4 className="font-semibold text-xl mb-4 flex items-center gap-2">
							<Building className="text-[var(--color-brand-accent)]" />
							For County Governments
						</h4>
						<ul className="space-y-3">
							<li className="flex items-center gap-2">
								<ClipboardList className="w-5 h-5 text-[var(--color-brand-accent)]" />
								Digital stall registry → no ghost stalls
							</li>
							<li className="flex items-center gap-2">
								<CreditCard className="w-5 h-5 text-[var(--color-brand-accent)]" />
								Automated billing & payments (M-Pesa)
							</li>
							<li className="flex items-center gap-2">
								<BarChart3 className="w-5 h-5 text-[var(--color-brand-accent)]" />
								Reports & analytics → track daily revenue
							</li>
						</ul>
					</div>

					{/* Vendors */}
					<div className="bg-[var(--color-bg)] rounded-2xl shadow-md p-6 border border-[var(--color-border)]">
						<h4 className="font-semibold text-xl mb-4 flex items-center gap-2">
							<Users className="text-[var(--color-brand-accent)]" />
							For Vendors
						</h4>
						<ul className="space-y-3">
							<li className="flex items-center gap-2">
								<CheckCircle className="w-5 h-5 text-[var(--color-brand-accent)]" />
								Fair stall allocation
							</li>
							<li className="flex items-center gap-2">
								<Smartphone className="w-5 h-5 text-[var(--color-brand-accent)]" />
								SMS reminders for payments
							</li>
							<li className="flex items-center gap-2">
								<Smartphone className="w-5 h-5 text-[var(--color-brand-accent)]" />
								Mobile-friendly booking
							</li>
						</ul>
					</div>
				</div>
			</section>

			{/* IMPACT */}
			<section className="py-16 px-6 text-center">
				<h3 className="font-heading text-3xl font-bold mb-6">Impact</h3>
				<div className="max-w-2xl mx-auto space-y-4">
					<p className="text-lg flex justify-center items-center gap-2">
						<BarChart3 className="w-6 h-6 text-[var(--color-brand-accent)]" />
						Counties report up to <b>30% more revenue</b> collected
					</p>
					<p className="text-lg flex justify-center items-center gap-2">
						<Users className="w-6 h-6 text-[var(--color-brand-accent)]" />
						Over <b>10,000 vendors</b> registered seamlessly
					</p>
				</div>
			</section>

			{/* CTA */}
			<section
				id="contact"
				className="text-center py-20 px-6 bg-[var(--color-brand-primary)] text-[var(--color-text-contrast)]">
				<h3 className="font-heading text-3xl font-bold mb-4">
					Ready to digitize your county markets?
				</h3>
				<button className="bg-[var(--color-brand-accent)] text-[var(--color-text-contrast)] px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition mt-4">
					Register Now
				</button>
			</section>

			{/* FOOTER */}
			<footer className="bg-[var(--color-card)] border-t border-[var(--color-border)] text-[var(--color-text)] py-8 text-center">
				<p>© {new Date().getFullYear()} SokoTrack. All rights reserved.</p>
				<p className="mt-2">Nairobi, Kenya</p>
			</footer>
		</div>
	);
}

export default LandingPage;
