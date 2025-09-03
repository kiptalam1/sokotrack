import React from "react";
import UserApplications from "../components/applications/UserApplications";
import AdminApplications from "../components/applications/AdminApplications";
import { useAuth } from "../contexts/AuthContext";

const Applications = () => {
	const { user, loading } = useAuth();
	return (
		<div className="min-h-screen w-full bg-[var(--color-bg)] text-[var(--color-text)] p-4 sm:p-6 sm:px-10 md:px-16 lg:px-20 flex flex-col items-center gap-3 font-[var(--font-sans)]">
			{/* Loader */}
			{loading && !user && (
				<div className="animate-spin border-4 border-blue-500 border-dashed w-6 h-6 mx-auto my-4 rounded-full"></div>
			)}
			{!loading && user && user.role === "user" ? (
				<UserApplications />
			) : user && user.role === "admin" ? (
				<AdminApplications />
			) : (
				""
			)}
		</div>
	);
};

export default Applications;
