import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const UserDashboard = () => {
	const { loading, user } = useAuth();

	if (loading) {
		return <p className="text-center">loading...</p>;
	}

	const titleCaseName = user?.name
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ");
	return (
		<div className="min-h-screen w-full flex flex-col gap-3 items-center bg-[var(--color-bg)] text-[var(--color-text)] py-8 sm:py-12 md:py-16 lg:py-20">
			{user && (
				<h1 className="text-center text-lg sm:text-2xl font-[var(--font-heading)]">
					Welcome{" "}
					<span className="font-semibold text-[var(--color-brand-primary)]">
						{titleCaseName}
					</span>
				</h1>
			)}
			<p className="text-lg sm:text-base italic text-center">
				You do not have any stalls yet. Apply for a stall
				<a className="underline sm:underline-0" href="#">
					{" "}
					here.
				</a>
			</p>
		</div>
	);
};

export default UserDashboard;
