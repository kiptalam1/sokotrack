import { useState } from "react";
import { toast } from "sonner";

import React from "react";

const useRegister = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [loading, setLoading] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (Object.values(formData).some((val) => !val.trim())) {
			toast.error("Please fill in all fields");
			setLoading(false);
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			toast.error("Passwords must match");
			setLoading(false);
			return;
		}
		setLoading(true);

		toast.promise(
			(async () => {
				const res = await fetch("/api/auth/signup", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(formData),
				});

				if (!res.ok) throw new Error("Failed to register user");

				const data = await res.json();
				console.log("registration data :", data);

				setFormData({
					name: "",
					email: "",
					password: "",
					confirmPassword: "",
				});
				return data.message || "Registration completed successfully";
			})(),
			{
				loading: "Registering...",
				success: (msg) => msg,
				error: (err) => err.message || "Something went wrong",
			}
		);

		setLoading(false);
	};

	return {
		loading,
		handleInputChange,
		handleSubmit,
		formData,
	};
};

export default useRegister;
