import React from "react";
import { useAuth } from "../contexts/AuthContext";
import UserDashboard from "../components/dashboards/UserDashboard";
import { Navigate, useParams } from "react-router-dom";
import AdminDashboard from "../components/dashboards/AdminDashboard";

const Dashboard = () => {
	const { loading, user } = useAuth();
	const { role } = useParams();

	if (loading) {
		return <p className="text-center">loading...</p>;
	}
	if (!user) return <Navigate to="/auth/login" />;

	if (role !== user?.role) {
		return <Navigate to={`/dashboard/${user?.role}`} replace />;
	}

	switch (role) {
		case "user":
			return <UserDashboard />;
	}

	const hasNoStall = user?.trader == null;
	// console.log(hasNoStall);

	return (
		<div className="min-h-screen w-full bg-[var(--color-bg)] text-[var(--color-text)] p-4 sm:p-6 sm:px-10 md:px-16 lg:px-20 flex flex-col items-center gap-3 font-[var(--font-sans)]">
			{/* Role-specific dashboard */}
			<div className="min-h-screen flex-1 w-full flex flex-col">
				{user.role === "user" && <UserDashboard />}
				{user.role === "trader" && hasNoStall && <UserDashboard />}
				{user.role === "admin" && <AdminDashboard />}
			</div>
		</div>
	);
};

export default Dashboard;
