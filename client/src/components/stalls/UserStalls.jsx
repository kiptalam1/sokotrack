import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";

const UserStalls = ({
	data,
	loading: loadingStalls,
	error: errorFetching,
	refetch: fetchData,
}) => {
	const { pagination } = data || {};
	const navigate = useNavigate();

	const handlePageChange = (newPage) => {
		if (newPage < 1 || newPage > pagination.totalPages) {
			return;
		}
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
				onClick={() => navigate("/markets")}
				className="self-start ml-0 rounded-full text-[var(--color-text)] hover:opacity-40 transition-all duration-200">
				<ArrowLeftIcon size={24} />
			</button>

			<table className="min-w-full bg-[var(--color-card)] text-[var(--color-text)] rounded">
				<thead className="bg-[var(--color-brand-primary)] text-[var(--color-text-contrast)]">
					<tr>
						<th className="py-2 px-4 text-left">Stall</th>
						<th className="py-2 px-4 text-left">Type</th>
						<th className="py-2 px-4 text-left">Rent</th>
						<th className="py-2 px-4 text-left">Market</th>
						<th className="py-2 px-4 text-left hidden sm:table-cell">Status</th>
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
								<td className="py-3 px-4 space-x-4 text-center text-sm italic underline">
									{stall.status === "available" ? <a href="#">Apply</a> : ""}
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

export default UserStalls;
