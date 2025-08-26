import React from "react";

const UserDashboard = () => {
	return (
		<div className="min-h-screen w-full flex flex-col items-center bg-[var(--color-bg)] text-[var(--color-text)] py-8 sm:py-12 md:py-16 lg:py-20">
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
