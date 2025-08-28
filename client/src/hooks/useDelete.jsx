import { useState } from "react";
import { toast } from "sonner";
import { useApi } from "./apiClient";

const useDelete = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { apiFetch } = useApi();

	const deleteResource = async (url) => {
		setLoading(true);
		setError(null);

		try {
			const res = await apiFetch(url, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
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
		deleteResource,
	};
};

export default useDelete;
