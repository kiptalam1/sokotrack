import { useState } from "react";
import { toast } from "sonner";
import { useApi } from "./apiClient";

const useUpdateApplications = (url) => {
	const { apiFetch } = useApi();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const updateResource = async (id, data) => {
		try {
			setLoading(true);
			setError(null);

			const res = await apiFetch(`${url}/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
				credentials: "include",
			});

			const result = await res.json();

			if (!res.ok) {
				throw new Error(result?.error);
			}
			toast.success(result.message);

			return result;
		} catch (error) {
			setError(error.message);
			toast.error(error.message);
			console.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		error,
		updateResource,
	};
};

export default useUpdateApplications;
