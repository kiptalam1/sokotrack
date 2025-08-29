import React, { useState } from "react";
import StallModal from "../modals/StallModal";
import { useParams } from "react-router-dom";
import useCreateStall from "../../hooks/useCreateStall";
import { Edit, Trash } from "lucide-react";

const AdminStalls = ({
	data,
	loading: loadingStalls,
	error: errorFetching,
	refetch: fetchData,
}) => {
	const { pagination } = data || {};
	const { id } = useParams();
	const [isOpen, setIsOpen] = useState(false);
	const [mode, _setMode] = useState("create"); // 'create' or 'edit'
	const [selectedStall, setSelectedStall] = useState(null);
	const { loading: _loadingCreate, _error, createStall } = useCreateStall();

	// console.log("id", id);

	// create new stall;
	const handleSubmit = async (formData) => {
		// const payload = {...formData, id}
		if (mode === "create") {
			const result = await createStall(formData, id);
			console.log("result :", result);
			if (result) {
				setIsOpen(false);
				setSelectedStall(false);
				fetchData();
			}
		}
	};

	const handlePageChange = (newPage) => {
		if (newPage < 1 || newPage > pagination.totalPages) return;
		fetchData({ page: newPage, limit: pagination.limit });
	};
	return (
		<div className="overflow-x-auto w-full h-full flex flex-col items-center gap-4 py-4 px-4 sm:px-8 md:px-12 lg:px-16">
			{loadingStalls && (
				<div className="animate-spin border-4 border-blue-500 border-dashed w-6 h-6 mx-auto my-4 rounded-full"></div>
			)}
			{errorFetching && <p className="text-red-500">{errorFetching.message}</p>}

			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className="self-end flex items-center gap-1 bg-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-primary)] py-1 px-2 rounded-lg text-[var(--color-text-contrast)] transition-all duration-200">
				Add Stall
			</button>

			<StallModal
				initialData={selectedStall}
				mode={mode}
				isOpen={isOpen}
				onCancel={() => setIsOpen(false)}
				onSubmit={(formData) => handleSubmit(formData)}
			/>

			<table className="min-w-full bg-[var(--color-card)] text-[var(--color-text)] rounded">
				<thead className="bg-[var(--color-brand-primary)] text-[var(--color-text-contrast)]">
					<tr>
						<th className="py-2 px-4 text-left">Stall</th>
						<th className="py-2 px-4 text-left">Type</th>
						<th className="py-2 px-4 text-left">Rent</th>
						<th className="py-2 px-4 text-left">Market</th>
						<th className="py-2 px-4 text-left hidden sm:table-cell">Date</th>
						<th className="py-2 px-4 text-left">Actions</th>
					</tr>
				</thead>

				<tbody>
					{!data?.stalls || data.stalls.length === 0 ? (
						<tr>
							<td colSpan="6" className="text-center py-4">
								No Stalls available
							</td>
						</tr>
					) : (
						data.stalls.map((stall) => (
							<tr key={stall.id} className="">
								<td className="py-2 px-4">{stall.stallNumber}</td>
								<td className="py-2 px-4">{stall.type}</td>
								<td className="py-2 px-4">{stall.monthlyRent}</td>
								<td className="py-2 px-4">{data.market?.name}</td>
								<td className="py-2 px-4 hidden sm:table-cell">
									{stall.createdAt?.split("T")[0]}
								</td>
								<td className="py-3 px-4 space-x-4">
									<button disabled={loadingStalls}>
										<Edit
											size={20}
											className="text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-primary)]"
										/>
									</button>
									<button disabled={loadingStalls}>
										<Trash
											size={20}
											className="text-red-500 hover:text-red-700"
										/>
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
			{/* Pagination Controls */}
			{pagination?.totalPages > 1 && (
				<div className="flex items-center gap-2 mt-4">
					<button
						onClick={() => handlePageChange(pagination.page - 1)}
						disabled={pagination.page === 1}
						className="px-3 py-1 rounded disabled:opacity-50">
						Prev
					</button>
					<span>
						Page {pagination.page} of {pagination.totalPages}
					</span>
					<button
						onClick={() => handlePageChange(pagination.page + 1)}
						disabled={pagination.page === pagination.totalPages}
						className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">
						Next
					</button>
				</div>
			)}

			{/* Page size selector */}
		</div>
	);
};

export default AdminStalls;
