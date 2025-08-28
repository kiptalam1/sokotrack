import React, { useEffect, useState } from "react";
import { Edit, Trash } from "lucide-react";
import MarketModal from "../modals/MarketModal";
import useCreateMarket from "../../hooks/useCreateMarket";
import useUpdateMarket from "../../hooks/useUpdateMarket";

const AdminMarkets = ({
	data,
	error: errorMarkets,
	loading: loadingMarkets,
}) => {
	const [markets, setMarkets] = useState(data?.markets || []);
	const [isModalOpen, setIsOpenModal] = useState(false);
	const [mode, setMode] = useState("create"); // "create" | "edit"
	const [selectedMarket, setSelectedMarket] = useState(null);
	const {
		loading: loadingCreateMarket,
		error: errorCreateMarket,
		createMarket,
	} = useCreateMarket();

	const {
		loading: loadingUpdateMarket,
		error: errorUpdateMarket,
		updateMarket,
	} = useUpdateMarket();

	useEffect(() => {
		if (data?.markets) setMarkets(data.markets);
	}, [data]);

	if (loadingMarkets || loadingCreateMarket || loadingUpdateMarket) {
		return <p className="text-center">loading...</p>;
	}

	if (errorMarkets) {
		return <p className="text-center text-red-500">{errorMarkets.message}</p>;
	}

	if (errorCreateMarket) {
		return (
			<p className="text-center text-red-500">{errorCreateMarket.message}</p>
		);
	}

	if (errorUpdateMarket) {
		return (
			<p className="text-center text-red-500">{errorUpdateMarket.message}</p>
		);
	}

	const handleSubmit = async (formData) => {
		if (mode === "create") {
			const result = await createMarket(formData);
			if (result) {
				setMarkets((prev) => [...prev, result.market]);
				setIsOpenModal(false);
				setSelectedMarket(null);
			}
		} else if (mode === "edit") {
			const result = await updateMarket(selectedMarket.id, formData);
			if (result) {
				setMarkets((prev) =>
					prev.map((m) => (m.id === selectedMarket.id ? result.market : m))
				);
				setIsOpenModal(false);
				setSelectedMarket(null);
			}
		}
	};

	return (
		<div className="w-full h-full flex flex-col items-center gap-4 py-4 px-4 sm:px-8 md:px-12 lg:px-16 border border-white">
			<button
				type="button"
				onClick={() => setIsOpenModal(!isModalOpen)}
				className="self-end bg-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-primary)] py-1 px-2 rounded-lg text-[var(--color-text-contrast)]transition-all duration-200">
				Add Market
			</button>
			<MarketModal
				isOpen={isModalOpen}
				mode={mode}
				initialData={selectedMarket}
				onSubmit={(formData) => handleSubmit(formData)}
				onCancel={() => setIsOpenModal(false)}
			/>

			{markets.length === 0 ? (
				<p>You have not added any market yet</p>
			) : (
				<ul>
					{markets.map((m) => (
						<li key={m.id}>
							{m.name} {m.county} {m.location} {m.createdAt.split("T")[0]}
							<div className="inline ml-4">
								<button
									onClick={() => {
										setIsOpenModal(true);
										setMode("edit");
										setSelectedMarket(m);
									}}>
									<Edit
										size={16}
										className="mr-2 text-[var(--color-brand-secondary)]"
									/>
								</button>
								<button>
									<Trash size={16} className="text-red-500" />
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default AdminMarkets;
