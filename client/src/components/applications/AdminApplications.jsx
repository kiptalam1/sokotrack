import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import useUpdateResource from "../../hooks/useUpdateResource";
// import { useParams } from "react-router-dom";

const AdminApplications = () => {
	const [loading, setLoading] = useState(false);
	const [actionLoading, setActionLoading] = useState(null);
	// const { id } = useParams();

	const {
		data,
		loading: loadingApplications,
		error: isFetchingError,
		refetch: fetchData,
	} = useFetch("/api/applications/all-applications");

	// update application status;
	const {
		loading: isUpdating,
		error: _isUpdateError,
		updateResource,
	} = useUpdateResource(`/api/applications/update-status`);

	const applications = data?.applications || [];

	useEffect(() => {
		const fetchAllApplications = async () => {
			setLoading(true);
			try {
				await fetchData();
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchAllApplications();
	}, [fetchData]);

	const handleAction = async (id, status) => {
		setActionLoading(`${status}-${id}`);
		try {
			const result = await updateResource(id, { status });
			if (result) {
				await fetchData();
			}
		} catch (err) {
			console.error(err);
		} finally {
			setActionLoading(null);
		}
	};

	return (
		<div className="overflow-x-auto w-full h-full flex flex-col items-center gap-4 py-4 px-4 sm:px-8 md:px-12 lg:px-16">
			{/* Loader */}
			{(loading || loadingApplications) && (
				<div className="animate-spin border-4 border-blue-500 border-dashed w-6 h-6 mx-auto my-4 rounded-full"></div>
			)}

			{/* Applications List rendered as table */}
			<div className="w-full">
				<h2 className="text-center font-semibold mb-2">All Applications</h2>

				{isFetchingError && (
					<p className="text-red-500 mt-2">Failed to load applications.</p>
				)}

				{applications.length === 0 && !loading && !loadingApplications ? (
					<p className="text-gray-500 mt-4">No applications yet.</p>
				) : (
					<div className="overflow-x-auto">
						<table className="min-w-full bg-[var(--color-card)] text-[var(--color-text)] rounded">
							<thead className="bg-[var(--color-brand-primary)] text-[var(--color-text-contrast)]">
								<tr>
									<th className="py-2 px-4 text-left">Applicant</th>
									<th className="py-2 px-4 text-left hidden sm:table-cell">
										National ID
									</th>
									<th className="py-2 px-4 text-left">Phone</th>
									<th className="py-2 px-4 text-left hidden sm:table-cell">
										Date
									</th>
									<th className="py-2 px-4 text-left">Status</th>
									<th className="py-2 px-4 text-left">Actions</th>
								</tr>
							</thead>
							<tbody>
								{applications.map((app) => {
									const date = new Date(app.createdAt).toLocaleDateString(
										"en-KE",
										{
											day: "2-digit",
											month: "short",
											year: "numeric",
										}
									);
									return (
										<tr key={app.id} className="border-b last:border-b-0">
											<td className="py-2 px-4">
												<div className="font-medium">
													{app.user?.name ? app.user.name : app.nationalId}
												</div>
												<div className="text-xs text-gray-400">
													{app.user?.county ?? ""}
												</div>
											</td>
											<td className="py-2 px-4 hidden sm:table-cell">
												{app.nationalId}
											</td>
											<td className="py-2 px-4">{app.phone}</td>
											<td className="py-2 px-4 hidden sm:table-cell">{date}</td>
											<td className="py-2 px-4">
												<span
													className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
														app.status === "approved"
															? "bg-green-100 text-green-700"
															: app.status === "rejected"
															? "bg-red-100 text-red-700"
															: "bg-yellow-100 text-yellow-700"
													}`}>
													{app.status}
												</span>
											</td>
											<td className="py-2 px-4">
												<div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
													<button
														disabled={
															actionLoading === `approved-${app.id}` ||
															app.status === "approved"
														}
														onClick={() => handleAction(app.id, "approved")}
														className="px-2 py-1 bg-green-600 text-white rounded text-sm disabled:opacity-50 flex items-center justify-center min-w-[70px]">
														{actionLoading === `approved-${app.id}` &&
														isUpdating ? (
															<div className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></div>
														) : (
															"Approve"
														)}
													</button>

													<button
														disabled={
															actionLoading === `rejected-${app.id}` ||
															app.status === "rejected"
														}
														onClick={() => handleAction(app.id, "rejected")}
														className="px-2 py-1 bg-red-500 text-white rounded text-sm disabled:opacity-50 flex items-center justify-center min-w-[70px]">
														{actionLoading === `rejected-${app.id}` &&
														isUpdating ? (
															<div className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></div>
														) : (
															"Reject"
														)}
													</button>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
};

export default AdminApplications;
