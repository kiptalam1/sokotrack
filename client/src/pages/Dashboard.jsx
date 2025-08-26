import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
	const { loading, user } = useAuth();

	if (loading && !user) {
		return <p>loading...</p>;
	}

	return (
		<div className="min-h-screen w-full p-4 sm:p-6 flex flex-col gap-3">
			{user && (
				<h1 className="text-center text-lg sm:text-2xl">Welcome {user.name}</h1>
			)}
		</div>
	);
};

export default Dashboard;
