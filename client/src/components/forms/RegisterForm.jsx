import useRegister from "../../hooks/useRegister";

const RegisterForm = () => {
	const { formData, handleInputChange, handleSubmit, loading } = useRegister();

	return (
		<div className="w-full p-4 sm:w-2xl">
			<h1 className="text-center mb-2 font-heading text-2xl">Register</h1>
			<form
				onSubmit={handleSubmit}
				id="form"
				className="flex flex-col gap-1 bg-[var(--color-card)] text-[var(--color-text)] shadow-2xl w-full p-4 sm:px-12 py-16 rounded-lg border border-[var(--color-border)]">
				<label htmlFor="name" className="text-base">
					Name:
				</label>
				<input
					id="name"
					name="name"
					type="text"
					value={formData.name}
					onChange={handleInputChange}
					className="mb-2 px-2 py-2 w-full border border-[var(--color-border)] rounded-md text-base bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)] transition-all"
				/>

				<label htmlFor="email" className="text-base">
					Email:
				</label>
				<input
					id="email"
					name="email"
					type="email"
					value={formData.email}
					onChange={handleInputChange}
					className="mb-2 px-2 py-2 w-full border border-[var(--color-border)] rounded-md text-base bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)] transition-all"
				/>

				<label htmlFor="password" className="text-base">
					Password:
				</label>
				<input
					id="password"
					name="password"
					type="password"
					value={formData.password}
					onChange={handleInputChange}
					className="mb-2 px-2 py-2 w-full border border-[var(--color-border)] rounded-md text-base bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)] transition-all"
				/>

				<label htmlFor="confirmPassword" className="text-base">
					Confirm Password:
				</label>
				<input
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					value={formData.confirmPassword}
					onChange={handleInputChange}
					className="mb-2 px-2 py-2 w-full border border-[var(--color-border)] rounded-md text-base bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)] transition-all"
				/>

				<button
					type="submit"
					className="mt-4 p-2 bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-secondary)] text-[var(--color-text-contrast)] rounded-md transition-all text-base font-medium">
					{loading ? "Registering..." : "Register"}
				</button>
			</form>
		</div>
	);
};

export default RegisterForm;
