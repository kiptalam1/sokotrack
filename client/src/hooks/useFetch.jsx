import React, { useCallback, useEffect, useState } from "react";
import { useApi } from "./apiClient.js";

const useFetch = (url) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { apiFetch } = useApi();

	const fetchData = useCallback(async () => {
		setLoading(true);

		try {
			const res = await apiFetch(url, { method: "GET" });
			const result = await res.json();

			if (!res.ok) throw new Error(result?.error || "Something went wrong");

			setData(result);
			setError(null);
			// console.log("data", result);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}, [url, apiFetch]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { data, loading, error, refetch: fetchData };
};

export default useFetch;
