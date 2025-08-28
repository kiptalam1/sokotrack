import { useState } from "react";
import { toast } from "sonner";
import { useApi } from "./apiClient";

const useDelete = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { apiFetch } = useApi();

	const deleteMarketOrStall = async (id, data) => {
		setLoading(true);
		setError(null);

		try {
			const res = await apiFetch(`/api/markets/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
				credentials: "include",
			});

			const result = await res.json();

			if (!res.ok) throw new Error(result?.error || "Delete failed");

			toast.success(result.message || "Deleted successfully");

			return result;
		} catch (error) {
			console.error(error.message);
			setError(error.message || "Something went wrong");
			toast.error(error.message || "Delete failed");
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		error,
		deleteMarketOrStall,
	};
};

export default useDelete;
