import { useEffect, useState } from "react";
import { Menu, X, MoonIcon, SunIcon } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";

const Navbar = () => {
	const [dark, setDark] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const { user, logout } = useAuth();

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

	// 🔑 helper for active link styling
	const linkClass = ({ isActive }) =>
		`${
			isActive
				? "text-[var(--color-brand-accent)] font-semibold border-b-2 border-[var(--color-brand-accent)]"
				: ""
		} hover:text-[var(--color-brand-accent)]`;

	return (
		<nav className="relative flex items-center justify-between p-4 sm:py-6 shadow-md bg-[var(--color-bg)] border-b border-[var(--color-border)]">
			{/* Logo */}
			<div className="flex items-center gap-2">
				<img src="/sokotrack-icon.svg" alt="Logo" className="w-7 h-7" />
				<h1 className="font-heading text-2xl font-semibold text-[var(--color-brand-primary)] dark:text-[var(--color-brand-accent)]">
					SokoTrack
				</h1>
			</div>

			{/* Mobile menu button */}
			<button
				className="sm:hidden p-2 rounded-md text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)]"
				aria-expanded={isOpen}
				onClick={() => setIsOpen(!isOpen)}>
				{isOpen ? <X size={28} /> : <Menu size={28} />}
			</button>

			{/* Desktop menu */}
			<ul className="hidden sm:flex items-center gap-6 font-sans text-[var(--color-text)] mr-2">
				<li>
					<NavLink
						to={user ? `/dashboard/${user.role}` : "/"}
						end
						className={linkClass}>
						{user ? "Dashboard" : "Home"}
					</NavLink>
				</li>

				<li>
					<NavLink to="/markets" className={linkClass}>
						Markets
					</NavLink>
				</li>
				{user && user.role === "admin" && (
					<li>
						<NavLink to={`/stalls/${user.role}`} className={linkClass}>
							Stalls
						</NavLink>
					</li>
				)}

				{user && (
					<li>
						<NavLink to={`/applications/${user.role}`} className={linkClass}>
							Applications
						</NavLink>
					</li>
				)}

				{user && (
					<li>
						<button
							onClick={logout}
							className="text-white bg-red-400 hover:bg-red-600 font-semibold px-3 py-1 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-400">
							Logout
						</button>
					</li>
				)}
				<li>
					<button
						onClick={toggleTheme}
						className="text-[var(--color-brand-accent)] mt-0.5 mr-4">
						{dark ? <SunIcon size={20} /> : <MoonIcon size={20} />}
					</button>
				</li>
			</ul>

			{/* Mobile dropdown */}
			<div
				className={`absolute top-full left-0 w-full bg-[var(--color-bg)] border-t border-[var(--color-border)] z-50 sm:hidden ${
					isOpen ? "block" : "hidden"
				}`}>
				<ul className="flex flex-col space-y-4 px-6 py-2 font-sans text-[var(--color-text)]">
					<li>
						<NavLink
							to={user ? `/dashboard/${user.role}` : "/"}
							end
							className={linkClass}>
							Home
						</NavLink>
					</li>

					<li>
						<NavLink to="/markets" className={linkClass}>
							Markets
						</NavLink>
					</li>
					{user && user.role === "admin" && (
						<li>
							<NavLink to={`/stalls/${user.role}`} className={linkClass}>
								Stalls
							</NavLink>
						</li>
					)}

					{user && (
						<li>
							<NavLink to={`/applications/${user.role}`} className={linkClass}>
								Applications
							</NavLink>
						</li>
					)}

					{user && (
						<li>
							<button
								onClick={logout}
								className="text-white bg-red-400 hover:bg-red-600 font-semibold px-3 py-1 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-400">
								Logout
							</button>
						</li>
					)}
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
