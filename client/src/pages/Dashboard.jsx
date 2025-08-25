import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
	const { loading, user } = useAuth();

	if (loading && !user) {
		return <p>loading...</p>;
	}

	return <div>{user && <h1>Welcome {user.name}</h1>}</div>;
};

export default Dashboard;
