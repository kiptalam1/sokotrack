import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getASingleStallDetails = async (req, res) => {
	const stallId = req.params.id;

	try {
		// check if stall exists;
		const stall = await prisma.stall.findUnique({
			where: {
				id: stallId,
			},
		});
		if (!stall) {
			return res.status(404).json({ error: "This stall does not exist" });
		}

		// return stall details;
		return res.status(200).json({
			stall,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Internal server error",
		});
	}
};


export const updateStall = async (req, res) => {
	const stallId = req.params.id;
	const { stallNumber, type, monthlyRent } = req.body;

	try {
		//⏳ TODO -> Only admin should update the stall;
		//
		//
		//
		//
		// check if stall exists;
		const stall = await prisma.stall.findUnique({ where: { id: stallId } });
		if (!stall) {
			return res.status(404).json({ error: "This stall does not exist" });
		}
		// if stall exists update;
		const updatedStall = await prisma.stall.update({
			where: { id: stallId },
			data: {
				stallNumber,
				type,
				monthlyRent,
			},
		});
		// return response;
		return res
			.status(200)
			.json({ message: "Stall updated successfully", updatedStall });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const deleteAStall = async (req, res) => {
	const stallId = req.params.id;
	try {
		const stall = await prisma.stall.findUnique({
			where: { id: stallId },
		});

		if (!stall) {
			return res.status(404).json({ error: "This stall no longer exists" });
		}
		const deletedStall = await prisma.stall.delete({
			where: { id: stallId },
		});

		return res.status(200).json({
			message: `${deletedStall.stallNumber} was deleted successfully`,
			stall: deletedStall,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const fetchAllStalls = async (req, res) => {
	const limit = parseInt(req.params.limit, 10) || 10;
	const page = parseInt(req.params.page) || 1;
	const skip = (page - 1) * limit;
	// check if user is admin;
	const { userId } = req.user;
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: { role: true },
	});
	const isAdmin = user?.role === "admin";

	if (!isAdmin) {
		return res.status(403).json({ error: "Access denied. Admins only." });
	}
	// else if user is admin then fetch all the stalls;
	const stalls = await prisma.stall.findMany({
		skip,
		take: limit,
	});

	const totalStalls = await prisma.stall.count();
	const totalPages = Math.ceil(totalStalls / limit);
	return res.status(200).json({
		stalls,
		pagination: {
			totalPages,
			currentPage: page,
			pageSize: limit,
			totalItems: totalStalls,
		},
	});
};