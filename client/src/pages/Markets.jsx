import React from "react";
import useFetch from "../hooks/useFetch";

const Markets = () => {
	const {
		data,
		loading: fetchMarketsLoading,
		error,
	} = useFetch("/api/markets/");

	if (fetchMarketsLoading) {
		return <p className="text-center">loading...</p>;
	}

	if (error) {
		return <p className="text-center text-red-500">{error.message}</p>;
	}
	return (
		<div className="min-h-screen w-full bg-[var(--color-bg)] text-[var(--color-text)] p-4 sm:p-6 sm:px-10 md:px-16 lg:px-20 flex flex-col items-center gap-3 font-[var(--font-sans)]">
			<div>
				{data && data.markets.length === 0 ? (
					<p>There are no markets to view yet</p>
				) : (
					<ul>
						{data?.markets.map((m) => (
							<li key={m.id}>{m}</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Markets;
