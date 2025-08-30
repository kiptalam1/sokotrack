import { useState } from "react";
import { toast } from "sonner";
import { useApi } from "./apiClient";

const useUpdateStall = () => {
	const [loading, setLoading] = useState(false);
	const { apiFetch } = useApi();

	const updateStall = async (data, id) => {
		setLoading(true);
		try {
			const res = await apiFetch(`/api/stalls/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(data),
			});

			const result = await res.json();
			if (!res.ok) {
				toast.error(result?.error || "Failed to update");
				return;
			}

			toast.success(result.message || "Stall updated successfully");
			return result;
		} catch (error) {
			console.error(error.message);
			toast.error(error.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return { loading, updateStall };
};

export default useUpdateStall;
