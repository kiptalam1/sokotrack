import React from "react";
import RegisterForm from "../components/forms/RegisterForm";

const Register = () => {
	return (
		<div className="h-screen w-screen flex flex-col items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)] sm:px-8">
			<RegisterForm />
		</div>
	);
};

export default Register;
