import React from "react";
import UserApplications from "../components/applications/UserApplications";

const Applications = () => {
	return (
		<div className="min-h-screen w-full bg-[var(--color-bg)] text-[var(--color-text)] p-4 sm:p-6 sm:px-10 md:px-16 lg:px-20 flex flex-col items-center gap-3 font-[var(--font-sans)]">
			<UserApplications />
		</div>
	);
};

export default Applications;
