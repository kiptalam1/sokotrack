import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const useLogin = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { loading, login } = useAuth();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(formData.email, formData.password);
	};
	return {
		formData,
		loading,
		handleInputChange,
		handleSubmit,
	};
};

export default useLogin;
