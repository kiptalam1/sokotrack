import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const applyForStall = async (req, res) => {
	const { userId } = req.user;
	const { nationalId, phone } = req.body;

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
};

export const getMyApplications = async (req, res) => {
	const { userId } = req.user;

	const applications = await prisma.application.findMany({
		where: {
			userId,
		},
	});

	return res.status(200).json({
		applications,
	});
};
