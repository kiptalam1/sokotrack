import { useEffect, useState } from "react";
import { Menu, X, MoonIcon, SunIcon } from "lucide-react";

const Navbar = () => {
	const [dark, setDark] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem("theme");
		if (stored) {
			const isDark = stored === "dark";
			setDark(isDark);
			document.documentElement.classList.toggle("dark", isDark);
		} else {
			const prefersDark = window.matchMedia(
				"(prefers-color-scheme: dark)"
			).matches;
			setDark(prefersDark);
			document.documentElement.classList.toggle("dark", prefersDark);
		}
	}, []);

	const toggleTheme = () => {
		const next = !dark;
		setDark(next);
		document.documentElement.classList.toggle("dark", next);
		localStorage.setItem("theme", next ? "dark" : "light");
	};

	return (
		<nav className="relative flex items-center justify-between p-4 sm:py-6 shadow-md bg-[var(--color-brand-primary)]">
			<div className="flex items-center gap-2">
				<img src="/sokotrack-icon.svg" alt="Logo" className="w-7 h-7" />
				<h1 className="font-heading text-2xl font-semibold text-[var(--color-gray-50)]">
					SokoTrack
				</h1>
			</div>

			<button
				className="sm:hidden p-2 rounded-md text-[var(--color-gray-50)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)]"
				aria-expanded={isOpen}
				onClick={() => setIsOpen(!isOpen)}>
				{isOpen ? <X size={28} /> : <Menu size={28} />}
			</button>

			<ul className="hidden sm:flex items-center gap-6 font-sans text-[var(--color-gray-50)] mr-2">
				<li>
					<a href="#">Home</a>
				</li>
				<li>
					<a href="#">About</a>
				</li>
				<li>
					<a href="#">Features</a>
				</li>
				<li>
					<a href="#">Contact</a>
				</li>
				<li>
					<button
						onClick={toggleTheme}
						className="text-[var(--color-brand-accent)] mt-0.5">
						{dark ? <SunIcon size={20} /> : <MoonIcon size={20} />}
					</button>
				</li>
			</ul>

			<div
				className={`absolute top-full left-0 w-full bg-[var(--color-brand-primary)] z-50 sm:hidden ${
					isOpen ? "block" : "hidden"
				}`}>
				<ul className="flex flex-col space-y-4 px-6 py-2 font-sans text-[var(--color-gray-50)]">
					<li>
						<a href="#">Home</a>
					</li>
					<li>
						<a href="#">About</a>
					</li>
					<li>
						<a href="#">Features</a>
					</li>
					<li>
						<a href="#">Contact</a>
					</li>
					<li>
						<button
							onClick={toggleTheme}
							className="text-[var(--color-brand-accent)]">
							{dark ? <SunIcon /> : <MoonIcon />}
						</button>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
