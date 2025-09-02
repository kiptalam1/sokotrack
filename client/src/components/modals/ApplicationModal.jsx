import React, { useState } from "react";

const ApplicationModal = ({ isOpen, onSubmit, onCancel }) => {
	const [formData, setFormData] = useState({
		nationalId: "",
		phone: "",
	});
	if (!isOpen) {
		return null; // do not render modal if closed;
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};
	return (
		<div
			onClick={onCancel}
			className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<form
				id="app-modal"
				onClick={(e) => e.stopPropagation()} // 🔑 prevent closing when clicking inside form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 w-full max-w-xl mx-4 p-6 
                  bg-[var(--color-card)] text-[var(--color-text)] 
                  rounded-xl shadow-xl relative">
				<h2 className="text-lg font-semibold text-center">Stall Application</h2>
				<div>
					<label htmlFor="nation-id" className="text-base block mb-1">
						National ID:
					</label>
					<input
						type="text"
						id="nation-id"
						name="nationalId"
						inputMode="numeric"
						value={formData.nationalId}
						onChange={handleInputChange}
						required
						className="py-2 px-4 text-base w-full border-none outline-none 
              focus:ring-2 focus:ring-[var(--color-brand-accent)] 
              rounded-lg bg-[var(--color-bg)]"
					/>
				</div>

				<div>
					<label htmlFor="phone" className="text-base block mb-1">
						Phone Number:
					</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						placeholder="+254712345678"
						value={formData.phone}
						onChange={handleInputChange}
						required
						pattern="^(\+254(7|1)\d{8}|0(7|1)\d{8})$"
						title="Enter a valid Kenyan phone number (e.g. +254712345678, +254112345678, 0712345678, or 0112345678)"
						className="py-2 px-4 text-base w-full border-none outline-none 
              focus:ring-2 focus:ring-[var(--color-brand-accent)] 
              rounded-lg bg-[var(--color-bg)]"
					/>
				</div>

				{/* Buttons */}
				<div className="flex justify-end gap-3 mt-4">
					<button
						type="button"
						onClick={onCancel}
						className="px-4 py-2 rounded-lg border border-[var(--color-border)] 
                      hover:bg-gray-100 dark:hover:bg-gray-300 transition">
						Cancel
					</button>
					<button
						type="submit"
						className="px-4 py-2 rounded-lg bg-[var(--color-brand-accent)] 
                  text-white font-semibold shadow-md hover:opacity-50 transition">
						Apply
					</button>
				</div>
			</form>
		</div>
	);
};

export default ApplicationModal;
