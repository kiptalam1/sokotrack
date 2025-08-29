import React, { useState } from "react";
import { toast } from "sonner";
import { useApi } from "./apiClient";
const useCreateStall = () => {
	const { apiFetch } = useApi();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const createStall = async (data, id) => {
		try {
			setLoading(true);
			setError(null);
			const res = await apiFetch(`/api/markets/${id}/stall`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
				credentials: "include",
			});
			const result = await res.json();

			if (!res.ok) throw new Error(result?.error || "Failed to create stall");

			toast.success(result?.message || "Stall created successfully");

			return result;
		} catch (error) {
			setError(error.message);
			toast.error(error.message);
			console.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, error, createStall };
};

export default useCreateStall;
