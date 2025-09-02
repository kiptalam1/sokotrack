import React, { useState } from "react";
import { Plus } from "lucide-react";
import ApplicationModal from "../modals/ApplicationModal";
import { toast } from "sonner";
import { useApi } from "../../hooks/apiClient";
import useFetch from "../../hooks/useFetch";

const UserApplications = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { apiFetch } = useApi();

	const {
		data,
		loading: loadingApplications,
		_error,
		refetch: fetchData,
	} = useFetch("/api/applications/my-applications");

	// ✅ safely drill into data
	const applications = data?.applications || [];

	const handleSubmit = async (formData) => {
		setLoading(true);
		try {
			const res = await apiFetch("/api/applications/apply", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
				credentials: "include",
			});
			const result = await res.json();

			if (!res.ok) {
				toast.error(result.error || "Application failed");
				return;
			}

			toast.success(result.message || "Application submitted successfully");

			fetchData(); // refresh list
		} catch (error) {
			console.error(error.message);
			toast.error(error.message || "Something went wrong");
		} finally {
			setLoading(false);
			setIsOpen(false);
		}
	};

	return (
		<div className="overflow-x-auto w-full h-full flex flex-col items-center gap-4 py-4 px-4 sm:px-8 md:px-12 lg:px-16">
			{/* Apply Button */}
			<div className="self-end">
				<button
					type="button"
					onClick={() => setIsOpen(true)}
					className="bg-[var(--color-brand-primary)] text-[var(--color-text-contrast)] py-1 px-2 rounded-lg hover:opacity-70 transition-all duration-200 flex items-center gap-1">
					<Plus size={20} /> Apply
				</button>
			</div>

			<ApplicationModal
				isOpen={isOpen}
				onSubmit={handleSubmit}
				onCancel={() => setIsOpen(false)}
			/>

			{/* Loader */}
			{(loading || loadingApplications) && (
				<div className="animate-spin border-4 border-blue-500 border-dashed w-6 h-6 mx-auto my-4 rounded-full"></div>
			)}

			{/* Applications List */}
			<div className="w-full">
				{applications.length === 0 && !loading && !loadingApplications ? (
					<p className="text-gray-500 mt-4">No applications yet.</p>
				) : (
					<ul className="w-full max-w-xl mx-auto space-y-3">
						{applications.map((app) => {
							const date = new Date(app.createdAt).toLocaleDateString("en-KE", {
								day: "2-digit",
								month: "short",
								year: "numeric",
							});
							return (
								<li
									key={app.id}
									className="bg-[var(--color-card)] rounded-lg p-3 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
									<div className="flex flex-col">
										<span className="font-medium text-base sm:text-lg">
											{app.nationalId}
										</span>
										<span className="text-sm text-gray-500">{app.phone}</span>
									</div>
									<div className="flex items-center gap-3 mt-2 sm:mt-0">
										<span className="text-sm text-gray-400">{date}</span>
										<span
											className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
												app.status === "approved"
													? "bg-green-100 text-green-700"
													: app.status === "rejected"
													? "bg-red-100 text-red-700"
													: "bg-yellow-100 text-yellow-700"
											}`}>
											{app.status}
										</span>
									</div>
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</div>
	);
};

export default UserApplications;
