import React, { useEffect, useState } from "react";
import { useApi } from "./apiClient.js";

const useFetch = (url) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { apiFetch } = useApi();

	useEffect(() => {
		let isMounted = true;

		(async () => {
			try {
				const res = await apiFetch(url, { method: "GET" });
				const result = await res.json();

				if (!res.ok) throw new Error(result?.error || "Something went wrong");

				if (isMounted) {
					setData(result);
					setError(null);
				}
				// console.log("data", result);
			} catch (err) {
				if (isMounted) {
					setError(err);
				}
			} finally {
				if (isMounted) setLoading(false);
			}
		})();

		return () => {
			isMounted = false;
		};
	}, [url, apiFetch]);

	return { data, loading, error };
};

export default useFetch;
