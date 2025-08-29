import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch";
import { Navigate, useParams } from "react-router-dom";
import AdminStalls from "../components/stalls/AdminStalls";

const MarketStalls = () => {
	const { loading: authLoading, user } = useAuth();
	// const { id } = useParams();
	const { id, role } = useParams();
	// const id = "550a890e-5097-40bf-bf7f-5ab62fdc11ee";
	const {
		data: stalls,
		loading: loadingStalls,
		error: errorFetching,
		refetch: fetchData,
	} = useFetch(`/api/markets/${id}/stalls`);

	// if (authLoading) {
	// 	return (
	// 		<div className="w-4 h-4 border-2 border-white border-dashed rounded-full animate-spin"></div>
	// 	);
	// }

	if (role !== user?.role) {
		return <Navigate to={`/markets/${id}/stalls/${user?.role}`} replace />;
	}

	const isAdmin = user?.role === "admin";

	if (errorFetching) {
		return toast.error("Failed to fetch stalls");
	}

	return (
		<div className="min-h-screen w-full bg-[var(--color-bg)] text-[var(--color-text)] p-4 sm:p-6 sm:px-10 md:px-16 lg:px-20 flex flex-col items-center gap-3 font-[var(--font-sans)]">
			{authLoading && (
				<div className="w-4 h-4 border-2 border-white border-dashed rounded-full animate-spin"></div>
			)}

			{user && isAdmin && (
				<AdminStalls
					data={stalls}
					loading={loadingStalls}
					error={errorFetching}
					refetch={fetchData}
				/>
			)}
		</div>
	);
};

export default MarketStalls;
