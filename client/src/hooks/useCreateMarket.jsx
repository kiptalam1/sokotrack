import React, { useState } from "react";
import { toast } from "sonner";
import { useApi } from "./apiClient";
const useCreateMarket = () => {
	const { apiFetch } = useApi();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const createMarket = async (data) => {
		try {
			setLoading(true);
			setError(null);
			const res = await apiFetch("/api/markets", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
				credentials: "include",
			});
			const result = await res.json();

			if (!res.ok) throw new Error(result?.error || "Failed to create market");

			toast.success(result?.message || "Market created successfully");

			return result;
		} catch (error) {
			setError(error.message);
			toast.error(error.message);
			console.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, error, createMarket };
};

export default useCreateMarket;
