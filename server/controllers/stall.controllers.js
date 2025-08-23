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
