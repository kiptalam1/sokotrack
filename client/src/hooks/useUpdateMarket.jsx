import { useState } from "react";
import { toast } from "sonner";
import { useApi } from "./apiClient";

const useUpdateMarket = () => {
	const { apiFetch } = useApi();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const updateMarket = async (id, data) => {
		try {
			setLoading(true);
			setError(null);

			const res = await apiFetch(`/api/markets/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
				credentials: "include",
			});

			const result = await res.json();

			if (!res.ok)
				throw new Error(result?.error || "Failed to update market. Try again");

			toast.success(result.message || "Market updated successfully");

			return result;
		} catch (error) {
			setError(error.message);
			toast.error(error.message || "Something went wrong");
			console.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		error,
		updateMarket,
	};
};

export default useUpdateMarket;
