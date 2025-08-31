// THIS PAGE WILL FETCH ALL THE STALLS THAT BELONGS TO ADMIN;
import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import StallModal from "../components/modals/StallModal";
import { Edit, Trash } from "lucide-react";
import useUpdateStall from "../hooks/useUpdateStall";
import useDelete from "../hooks/useDelete";

const Stalls = () => {
	const {
		data,
		loading: loadingStalls,
		error: errorFetching,
		refetch: fetchData,
	} = useFetch(`/api/stalls/`);

	const [isOpen, setIsOpen] = useState(false);
	const [mode, setMode] = useState("create"); // 'create' or 'edit'
	const [selectedStall, setSelectedStall] = useState(null);
	const { loading: loadingUpdate, updateStall } = useUpdateStall();
	const { loading: loadingDeleteStall, deleteResource } = useDelete();
	const [deletingStallId, setDeletingStallId] = useState(null);

	const pagination = data?.pagination || {};

	// create/update new stall;
	const handleSubmit = async (formData) => {
		if (mode === "edit") {
			const result = await updateStall(formData, selectedStall.id);
			if (result) {
				setIsOpen(false); // close the modal;
				setSelectedStall(null);
				await fetchData(); // refetch the stalls;
			}
		}
	};

	// delete a stall;
	const handleDelete = async (id) => {
		if (!window.confirm("Are you sure you want to delete this stall?")) {
			return;
		}
		setDeletingStallId(id);
		const result = await deleteResource(`/api/stalls/${id}`);
		if (result) {
			setSelectedStall(null);
			await fetchData();
		}
		setDeletingStallId(null);
	};

	const handlePageChange = (newPage) => {
		if (newPage < 1 || newPage > pagination.totalPages) {
			return;
		}
		fetchData({ page: newPage, limit: pagination.limit });
	};
	return (
		// <div className="overflow-x-auto w-full h-full flex flex-col items-center gap-4 py-4 px-4 sm:px-8 md:px-12 lg:px-16">
		<div className="min-h-screen w-full bg-[var(--color-bg)] text-[var(--color-text)] p-4 sm:p-6 sm:px-10 md:px-16 lg:px-20 flex flex-col items-center gap-3 font-[var(--font-sans)]">
			{loadingStalls && (
				<div className="animate-spin border-4 border-blue-500 border-dashed w-6 h-6 mx-auto my-4 rounded-full"></div>
			)}
			{errorFetching && <p className="text-red-500">{errorFetching.message}</p>}

			<StallModal
				initialData={selectedStall}
				mode={mode}
				isOpen={isOpen}
				onCancel={() => setIsOpen(false)}
				onSubmit={(formData) => handleSubmit(formData)}
			/>

			<table className="min-w-full bg-[var(--color-card)] text-[var(--color-text)] rounded mt-2 text-sm sm:text-base">
				<thead className="bg-[var(--color-brand-primary)] text-[var(--color-text-contrast)]">
					<tr>
						<th className="py-2 px-4 text-left">Stall</th>
						<th className="py-2 px-4 text-left">Type</th>
						<th className="py-2 px-4 text-left ">Status</th>
						<th className="py-2 px-4 text-left hidden sm:table-cell">Rent</th>
						<th className="py-2 px-4 text-left hidden sm:table-cell">Market</th>
						<th className="py-2 px-4 text-left hidden sm:table-cell">Date</th>
						<th className="py-2 px-4 text-left">Actions</th>
					</tr>
				</thead>

				<tbody>
					{!data?.stalls || data.stalls.length === 0 ? (
						<tr>
							<td colSpan="4" className="text-center py-4">
								No Stalls available
							</td>
						</tr>
					) : (
						data.stalls.map((stall) => (
							<tr key={stall.id} className="">
								<td className="py-2 px-4">{stall.stallNumber}</td>
								<td className="py-2 px-4">{stall.type}</td>
								<td
									className={`py-2 px-4 text-[#111827] ${
										stall.status === "available"
											? "bg-green-100"
											: stall.status === "occupied"
											? "bg-red-100"
											: stall.status === "maintenance"
											? "bg-amber-100"
											: "bg-gray-100"
									}`}>
									{stall.status}
								</td>
								<td className="py-2 px-4 hidden sm:table-cell">
									{stall.monthlyRent}
								</td>
								<td className="py-2 px-4 hidden sm:table-cell">
									{stall.market?.name}
								</td>
								<td className="py-2 px-4 hidden sm:table-cell">
									{stall.createdAt?.split("T")[0]}
								</td>
								<td className="py-3 px-4 flex items-center flex-col sm:flex-row gap-2 sm:space-x-4">
									<div className="flex flex-col sm:flex-row items-center gap-3 sm:space-x-4">
										<button
											disabled={loadingUpdate}
											onClick={() => {
												setIsOpen(true);
												setMode("edit");
												setSelectedStall(stall);
											}}>
											<Edit
												size={20}
												className="text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-primary)]"
											/>
										</button>
										<button
											disabled={
												loadingDeleteStall && deletingStallId === stall.id
											}
											onClick={() => handleDelete(stall.id)}>
											{loadingDeleteStall && deletingStallId === stall.id ? (
												<div className="w-4 h-4 border-2 border-red-500 border-dashed rounded-full animate-spin"></div>
											) : (
												<Trash
													size={20}
													className="text-red-500 hover:text-red-700"
												/>
											)}
										</button>
									</div>
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
						onClick={() => handlePageChange(pagination.currentPage - 1)}
						disabled={pagination.currentPage === 1}
						className="px-3 py-1 rounded disabled:opacity-50">
						Prev
					</button>
					<span>
						Page {pagination.currentPage} of {pagination.totalPages}
					</span>
					<button
						onClick={() => handlePageChange(pagination.currentPage + 1)}
						disabled={pagination.currentPage === pagination.totalPages}
						className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">
						Next
					</button>
				</div>
			)}

			{/* Page size selector */}
		</div>
	);
};

export default Stalls;
