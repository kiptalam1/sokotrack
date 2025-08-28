import React, { useState, useEffect } from "react";

const MarketModal = ({
	isOpen,
	mode,
	initialData = null,
	onSubmit,
	onCancel,
}) => {
	const [formData, setFormData] = useState({
		name: "",
		location: "",
		county: "",
	});

	useEffect(() => {
		if (initialData) setFormData(initialData);
	}, [initialData]);

	if (!isOpen) return null; // 🔑 don’t render at all if closed

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<div
			className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
			onClick={onCancel} // 🔑 close when clicking backdrop
		>
			<form
				onClick={(e) => e.stopPropagation()} // 🔑 prevent closing when clicking inside form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 w-full max-w-xl mx-4 p-6 
                   bg-[var(--color-card)] text-[var(--color-text)] 
                   rounded-xl shadow-xl relative">
				{/* Modal Title */}
				<h2 className="text-xl font-semibold mb-2">
					{mode === "edit" ? "Update Market" : "Create Market"}
				</h2>

				{/* Market Name */}
				<div>
					<label htmlFor="name" className="block mb-1 font-medium">
						Market Name
					</label>
					<input
						type="text"
						id="name"
						value={formData.name}
						onChange={handleChange}
						required
						className="w-full py-2 px-4 rounded-lg bg-[var(--color-bg)]
                       border border-[var(--color-border)]
                       focus:ring-2 focus:ring-[var(--color-brand-accent)]"
					/>
				</div>

				{/* County */}
				<div>
					<label htmlFor="county" className="block mb-1 font-medium">
						County
					</label>
					<input
						type="text"
						id="county"
						value={formData.county}
						onChange={handleChange}
						required
						className="w-full py-2 px-4 rounded-lg bg-[var(--color-bg)]
                       border border-[var(--color-border)]
                       focus:ring-2 focus:ring-[var(--color-brand-accent)]"
					/>
				</div>

				{/* Location */}
				<div>
					<label htmlFor="location" className="block mb-1 font-medium">
						Location (Optional)
					</label>
					<input
						type="text"
						id="location"
						value={formData.location}
						onChange={handleChange}
						className="w-full py-2 px-4 rounded-lg bg-[var(--color-bg)]
                       border border-[var(--color-border)]
                       focus:ring-2 focus:ring-[var(--color-brand-accent)]"
					/>
				</div>

				{/* Buttons */}
				<div className="flex justify-end gap-3 mt-4">
					<button
						type="button"
						onClick={onCancel}
						className="px-4 py-2 rounded-lg border border-[var(--color-border)] 
                       hover:bg-gray-100 dark:hover:bg-gray-700 transition">
						Cancel
					</button>
					<button
						type="submit"
						className="px-4 py-2 rounded-lg bg-[var(--color-brand-accent)] 
                       text-white font-semibold shadow-md hover:opacity-90 transition">
						{mode === "edit" ? "Update" : "Create"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default MarketModal;
