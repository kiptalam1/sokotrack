import React from "react";
import useFetch from "../hooks/useFetch";
import AdminMarkets from "../components/markets/AdminMarkets";
import { useAuth } from "../contexts/AuthContext";
import UserMarkets from "../components/markets/UserMarkets";

const Markets = () => {
	const { loading: authLoading, user } = useAuth();

	const {
		data,
		loading: fetchMarketsLoading,
		error,
		refetch,
	} = useFetch("/api/markets/");

	const isAdmin = user?.role === "admin";

	return (
		<div className="min-h-screen w-full bg-[var(--color-bg)] text-[var(--color-text)] p-4 sm:p-6 sm:px-10 md:px-16 lg:px-20 flex flex-col items-center gap-3 font-[var(--font-sans)] text-sm sm:text-base">
			{authLoading ||
				(fetchMarketsLoading && (
					<div className="w-4 h-4 border-2 border-white border-dashed rounded-full animate-spin"></div>
				))}
			{user && isAdmin && (
				<>
					<AdminMarkets
						data={data}
						error={error}
						loading={fetchMarketsLoading}
						refetch={refetch}
					/>
				</>
			)}
			{user && !isAdmin && (
				<>
					<UserMarkets
						data={data}
						error={error}
						loading={fetchMarketsLoading}
						refetch={refetch}
					/>
				</>
			)}
		</div>
	);
};

export default Markets;
