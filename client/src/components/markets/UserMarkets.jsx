import React, { useState } from "react";
import { RefreshCw } from "lucide-react";

const UserMarkets = ({ data, error, loading, refetch }) => {
	const [isRefreshing, setIsRefreshing] = useState(false);

	const handleRefresh = async () => {
		if (!refetch) return;
		setIsRefreshing(true);
		try {
			await refetch();
		} catch (err) {
			console.error("Failed to refresh markets:", err);
		} finally {
			setIsRefreshing(false);
		}
	};
	return (
		<div className="overflow-x-auto w-full h-full flex flex-col items-center gap-4 py-4 px-4 sm:px-8 md:px-12 lg:px-16">
			<div className="w-full flex justify-end mb-2">
				<button
					className="flex items-center gap-2 px-2 py-1 rounded text-[var(--color-text)] hover:text-[var(--color-brand-primary)] disabled:opacity-50"
					onClick={handleRefresh}
					disabled={isRefreshing}>
					<RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
					<span className="hidden sm:inline">Refresh</span>
				</button>
			</div>
			{loading && !isRefreshing && (
				<div className="animate-spin border-4 border-blue-500 border-dashed w-6 h-6 mx-auto my-4 rounded-full"></div>
			)}

			{error && <p className="text-red-500">{error.message}</p>}

			<table className="min-w-full bg-[var(--color-card)] text-[var(--color-text)] rounded">
				<thead className="bg-[var(--color-brand-primary)] text-[var(--color-text-contrast)]">
					<tr>
						<th className="py-2 px-4 text-left">Market</th>
						<th className="py-2 px-4 text-left">Location</th>
						<th className="py-2 px-4 text-left">County</th>
						{/* <th className="py-2 px-4 text-left hidden sm:table-cell">Date</th> */}
					</tr>
				</thead>

				<tbody>
					{!data?.markets || data.markets.length === 0 ? (
						<tr>
							<td colSpan="3" className="text-center py-4">
								No markets available
							</td>
						</tr>
					) : (
						data.markets.map((market) => (
							<tr key={market.id} className="">
								<td className="py-2 px-4">{market.name}</td>
								<td className="py-2 px-4">{market.location}</td>
								<td className="py-2 px-4">{market.county}</td>
								{/* <td className="py-2 px-4 hidden sm:table-cell">
									{market.createdAt.split("T")[0]}
								</td> */}
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default UserMarkets;
