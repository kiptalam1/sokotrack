import { useEffect, useState } from "react";

const StallModal = ({
	initialData = null,
	mode,
	isOpen,
	onCancel,
	onSubmit,
}) => {
	// onsubmit;
	const [formData, setFormData] = useState({
		stallNumber: "",
		monthlyRent: "",
		type: "",
	});

	useEffect(() => {
		if (initialData) {
			setFormData(initialData);
		}
	}, [initialData]);

	if (!isOpen) return null; // 🔑 don’t render at all if closed

	// handle input fields changes;
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// submit form data;
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};
	return (
		<div
			className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
			onClick={onCancel}>
			<form
				onSubmit={handleSubmit}
				onClick={(e) => e.stopPropagation()} // prevent closing the modal when clicking inside form (e.g., input box)
				id="stall-modal"
				className="flex flex-col gap-4 bg-[var(--color-card)] text-[var(--color-text)] w-full max-w-xl mx-6 p-6 rounded-2xl shadow-xl">
				{/* Modal Title */}
				<h2 className="text-xl font-semibold mb-2">
					{mode === "edit" ? "Update Stall" : "Create Stall"}
				</h2>

				{/* Stall Number */}
				<div>
					<label htmlFor="stall" className="block mb-1 font-medium">
						Stall Number or Name
					</label>
					<input
						id="stall"
						name="stallNumber"
						type="text"
						value={formData.stallNumber}
						onChange={handleInputChange}
						className="w-full bg-[var(--color-bg)] py-2 px-4 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:outline-none"
					/>
				</div>

				{/* Rent */}
				<div>
					<label htmlFor="rent" className="block mb-1 font-medium">
						Monthly Rent
					</label>
					<input
						id="rent"
						name="monthlyRent"
						type="number"
						min={0}
						required
						value={formData.monthlyRent}
						onChange={handleInputChange}
						className="w-full bg-[var(--color-bg)] py-2 px-4 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:outline-none"
					/>
				</div>

				{/* Type */}
				<div>
					<label htmlFor="type" className="block mb-1 font-medium">
						Stall Type
					</label>
					<select
						id="type"
						name="type"
						value={formData.type}
						onChange={handleInputChange}
						className="w-full bg-[var(--color-bg)] py-2 px-4 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:outline-none">
						<option value="">Select</option>
						<option value="food">Food</option>
						<option value="wholesale">Wholesale</option>
						<option value="retail">Retail</option>
						<option value="other">Other</option>
					</select>
				</div>

				{/* Buttons */}
				<div className="flex justify-end gap-3 mt-4">
					<button
						type="button"
						onClick={onCancel}
						className="px-4 py-2 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-bg-hover)] transition-all duration-200">
						Cancel
					</button>
					<button
						type="submit"
						className="px-4 py-2 rounded-lg bg-[var(--color-brand-accent)] text-white font-semibold shadow-md hover:opacity-80 transition-all duration-200">
						{mode === "edit" ? "Update" : "Create"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default StallModal;
