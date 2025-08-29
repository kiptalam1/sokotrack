// THIS PAGE WILL FETCH ALL THE STALLS THAT BELONGS TO ADMIN;

// import React, { useState } from "react";
// import StallModal from "../components/modals/StallModal";

// const Stalls = () => {
// 	const [isOpen, setIsOpen] = useState(false);
// 	const [mode, setMode] = useState("create"); // 'create' or 'edit'
// 	const [selectedStall, setSelectedStall] = useState(null);

// 	// create new stall;
// 	const handleSubmit = async (formData) => {};
// 	return (
// 		<div className="min-h-screen w-full bg-[var(--color-bg)] text-[var(--color-text)] p-4 sm:p-6 sm:px-10 md:px-16 lg:px-20 flex flex-col items-center gap-3 font-[var(--font-sans)]">
// 			<div className="overflow-x-auto w-full h-full flex flex-col items-center gap-4 py-2 px-4 sm:px-8 md:px-12 lg:px-16">
// 				<button
// 					type="button"
// 					onClick={() => setIsOpen(true)}
// 					className="self-end flex items-center gap-1 bg-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-primary)] py-1 px-2 rounded-lg text-[var(--color-text-contrast)] transition-all duration-200">
// 					Add Stall
// 				</button>

// 				<StallModal
// 					initialData={selectedStall}
// 					mode={mode}
// 					isOpen={isOpen}
// 					onCancel={() => setIsOpen(false)}
// 					onSubmit={(formData) => handleSubmit(formData)}
// 				/>
// 			</div>
// 		</div>
// 	);
// };

// export default Stalls;
