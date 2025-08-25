import React from "react";
import LoginForm from "../components/forms/LoginForm";

const Login = () => {
	return (
		<div className="h-screen w-screen flex flex-col items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)] sm:px-8">
			<LoginForm />
		</div>
	);
};

export default Login;
