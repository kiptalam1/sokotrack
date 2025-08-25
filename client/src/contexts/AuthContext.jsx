import { useContext, createContext, useState, useEffect } from "react";
import { toast } from "sonner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [accessToken, setAccessToken] = useState(null);
	const [loading, setLoading] = useState(false);

	// login function;
	const login = async (email, password) => {
		setLoading(true);
		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
				credentials: "include",
			});
			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || "Login failed");
			}

			setUser(data.user);
			setAccessToken(data.accessToken);
			toast.success(data.message || "Logged in successfully");
		} catch (error) {
			console.error(error.message);
			toast.error(error.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	// logout function;
	const logout = async () => {
		try {
			await fetch("/api/auth/logout", {
				method: "POST",
				credentials: "include",
			});
			setUser(null);
			setAccessToken(null);
			toast.success("Logged out successfully");
		} catch (error) {
			console.error(error.message);
			toast.error("Failed to log out");
		}
	};

	// refresh access token;
	const refreshAccessToken = async () => {
		try {
			const res = await fetch("/api/auth/refresh", {
				method: "GET",
				credentials: "include",
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Failed to refresh token");
			setAccessToken(data.accessToken);
			return data.accessToken;
		} catch (error) {
			setUser(null);
			setAccessToken(null);
			console.error("Token refresh failed:", error.message);
			return null;
		}
	};

	// auto-refresh token every 14 minutes;
	useEffect(() => {
		const interval = setInterval(() => {
			if (user) refreshAccessToken();
		}, 14 * 60 * 1000);
		return () => {
			clearInterval(interval);
		};
	}, [user]);

	return (
		<AuthContext.Provider
			value={{ user, accessToken, loading, login, logout, refreshAccessToken }}>
			{children}
		</AuthContext.Provider>
	);
};

// hook to consume context
export const useAuth = () => useContext(AuthContext);
