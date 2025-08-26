import { useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
export const useApi = () => {
	const { accessToken, refreshAccessToken } = useAuth();

	const apiFetch = useCallback(
		async (url, options = {}) => {
			let res = await fetch(url, {
				...options,
				headers: {
					...options.headers,
					Authorization: `Bearer ${accessToken}`,
				},
				credentials: "include",
			});

			if (res.status === 401) {
				const newToken = await refreshAccessToken();
				if (!newToken) {
					throw new Error("Session has expired. Login again");
				}
				res = await fetch(url, {
					...options,
					headers: {
						...options.headers,
						Authorization: `Bearer ${newToken}`,
					},
					credentials: "include",
				});
			}
			return res;
		},
		[accessToken, refreshAccessToken]
	);
	return { apiFetch };
};
