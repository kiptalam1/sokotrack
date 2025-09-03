import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const applyForStall = async (req, res) => {
	const { userId } = req.user;
	const { nationalId, phone } = req.body;

	try {
		// check if user has a pending/approved application;
		const existingApplication = await prisma.application.findFirst({
			where: {
				nationalId,
				status: {
					in: ["pending", "approved"],
				},
			},
		});

		if (existingApplication) {
			return res.status(400).json({
				error: "You have already made an application",
			});
		}

		// else create a new application;
		const newApplication = await prisma.application.create({
			data: {
				userId,
				nationalId,
				phone,
				status: "pending",
			},
		});

		// return response;
		return res.status(201).json({
			message: "Application submitted successfully",
			application: newApplication,
		});
	} catch (error) {
		console.error("Error applying for stall:", error);
		return res.status(500).json({
			error: "Internal server error",
		});
	}
};

export const getMyApplications = async (req, res) => {
	try {
		const { userId } = req.user;

		const applications = await prisma.application.findMany({
			where: {
				userId,
			},
		});

		return res.status(200).json({
			applications,
		});
	} catch (error) {
		console.error("Error fetching applications:", error);
		return res.status(500).json({
			error: "Internal server error",
		});
	}
};

export const getAllApplications = async (req, res) => {
	const { userId } = req.user;
	// if user is admin, they can view all the applications.
	try {
		const isAdmin = await prisma.user.findUnique({
			where: {
				id: userId,
				role: "admin",
			},
		});
		if (!isAdmin) {
			return res.status(403).json({ error: "Access denied" });
		}
		const applications = await prisma.application.findMany({
			include: {
				user: {
					select: {
						id: true,
						name: true,
						county: true,
					},
				},
			},
		});
		return res.status(200).json({ applications });
	} catch (error) {
		console.error("Error fetching applications:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};