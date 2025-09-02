import React, { useState } from "react";
import { Plus } from "lucide-react";
import ApplicationModal from "../modals/ApplicationModal";

const UserApplications = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="overflow-x-auto w-full h-full flex flex-col items-center gap-4 py-4 px-4 sm:px-8 md:px-12 lg:px-16">
			<div className="self-end">
				<button
					type="button"
					onClick={() => setIsOpen(true)}
					className="bg-[var(--color-brand-primary)] text-[var(--color-text-contrast)] py-1 px-2 rounded-lg hover:opacity-70 transition-all duration-200 flex items-center gap-1">
					<Plus size={20} /> Apply
				</button>
			</div>
			<div>
				<ApplicationModal
					isOpen={isOpen}
					onSubmit={""}
					onCancel={() => setIsOpen(false)}
				/>
			</div>
		</div>
	);
};

export default UserApplications;
