import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const AdminDashboard = () => {
	const { loading: authLoading, user } = useAuth();

	if (authLoading) {
		return <p className="text-center">loading...</p>;
	}

	const titleCaseName = user?.name
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ");
	return (
		<div className="min-h-screen w-full flex flex-col gap-3 items-center bg-[var(--color-bg)] text-[var(--color-text)] py-4 lg:py-12">
			{user && (
				<h1 className="text-center text-lg sm:text-2xl font-[var(--font-heading)]">
					Welcome{" "}
					<span className="font-semibold text-[var(--color-brand-primary)]">
						{titleCaseName}
					</span>
				</h1>
			)}
		</div>
	);
};

export default AdminDashboard;
