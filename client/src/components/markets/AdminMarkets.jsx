import { useState } from "react";
import { Edit, Trash } from "lucide-react";
import MarketModal from "../modals/MarketModal";
import useCreateMarket from "../../hooks/useCreateMarket";
import useUpdateMarket from "../../hooks/useUpdateMarket";
import useDelete from "../../hooks/useDelete";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AdminMarkets = ({
	data,
	error: errorMarkets,
	loading: loadingMarkets,
	refetch,
}) => {
	const [isModalOpen, setIsOpenModal] = useState(false);
	const [mode, setMode] = useState("create"); // "create" | "edit"
	const [selectedMarket, setSelectedMarket] = useState(null);
	const { loading: loadingCreateMarket, createMarket } = useCreateMarket();
	const { loading: loadingUpdateMarket, updateMarket } = useUpdateMarket();
	const { loading: loadingDeleteMarket, deleteResource } = useDelete();

	const { user } = useAuth();

	const handleSubmit = async (formData) => {
		if (mode === "create") {
			const result = await createMarket(formData);
			if (result) {
				await refetch(); // pull fresh data from backend
				setIsOpenModal(false);
				setSelectedMarket(null);
			}
		} else if (mode === "edit") {
			const result = await updateMarket(selectedMarket.id, formData);
			if (result) {
				await refetch(); // refresh with updated data
				setIsOpenModal(false);
				setSelectedMarket(null);
			}
		}
	};

	const handleDelete = async (id) => {
		if (!window.confirm("Are you sure you want to delete this market?")) return;
		const result = await deleteResource(`/api/markets/${id}`);
		if (result) {
			await refetch();
			setSelectedMarket(null);
		}
	};
	return (
		<div className="overflow-x-auto w-full h-full flex flex-col items-center gap-4 py-4 px-4 sm:px-8 md:px-12 lg:px-16">
			<button
				type="button"
				disabled={loadingCreateMarket}
				onClick={() => {
					setMode("create");
					setIsOpenModal(true);
				}}
				className="self-end flex items-center gap-1 bg-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-primary)] py-1 px-2 rounded-lg text-[var(--color-text-contrast)] transition-all duration-200">
				{loadingCreateMarket ? (
					<div className="w-4 h-4 border-2 border-white border-dashed rounded-full animate-spin"></div>
				) : (
					"Add Market"
				)}
			</button>
			<MarketModal
				isOpen={isModalOpen}
				mode={mode}
				initialData={selectedMarket}
				onSubmit={(formData) => handleSubmit(formData)}
				onCancel={() => setIsOpenModal(false)}
			/>

			{loadingMarkets && (
				<div className="animate-spin border-4 border-blue-500 border-dashed w-6 h-6 mx-auto my-4 rounded-full"></div>
			)}

			{errorMarkets && <p className="text-red-500">{errorMarkets.message}</p>}

			<table className="min-w-full bg-[var(--color-card)] text-[var(--color-text)] rounded">
				<thead className="bg-[var(--color-brand-primary)] text-[var(--color-text-contrast)]">
					<tr>
						<th className="py-2 px-4 text-left">Market</th>
						<th className="py-2 px-4 text-left">Location</th>
						<th className="py-2 px-4 text-left">County</th>
						<th className="py-2 px-4 text-left hidden sm:table-cell">Date</th>
						<th className="py-2 px-4 text-left">Actions</th>
					</tr>
				</thead>

				<tbody>
					{!data?.markets || data.markets.length === 0 ? (
						<tr>
							<td colSpan="5" className="text-center py-4">
								No markets available
							</td>
						</tr>
					) : (
						data.markets.map((market) => (
							<tr key={market.id} className="">
								<td className="py-2 px-4">{market.name}</td>
								<td className="py-2 px-4">{market.location}</td>
								<td className="py-2 px-4">{market.county}</td>
								<td className="py-2 px-4 hidden sm:table-cell">
									{market.createdAt.split("T")[0]}
								</td>
								<td className="py-3 px-4 space-x-4 flex items-center flex-nowrap">
									<button
										disabled={loadingUpdateMarket}
										onClick={() => {
											setIsOpenModal(true);
											setMode("edit");
											setSelectedMarket(market);
										}}>
										{loadingUpdateMarket ? (
											<div className="w-4 h-4 border-2 border-blue-500 border-dashed rounded-full animate-spin"></div>
										) : (
											<Edit
												size={20}
												className="text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-primary)]"
											/>
										)}
									</button>
									<button
										disabled={loadingDeleteMarket}
										onClick={() => {
											handleDelete(market.id);
										}}>
										{loadingDeleteMarket ? (
											<div className="w-4 h-4 border-2 border-red-500 border-dashed rounded-full animate-spin"></div>
										) : (
											<Trash
												size={20}
												className="text-red-500 hover:text-red-700"
											/>
										)}
									</button>
									<Link
										to={`/markets/${market.id}/stalls/${user?.role}`}
										className="text-[var(--color-brand-primary)] hover:underline text-sm sm:text-base">
										View stalls
									</Link>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default AdminMarkets;
