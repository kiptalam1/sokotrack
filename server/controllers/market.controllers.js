import { PrismaClient, StallType } from "@prisma/client";

const prisma = new PrismaClient();

export const createMarket = async (req, res) => {
	const { name, location, county } = req.body;
	try {
		// TODO -> Only admins should create markets;
		//
		//
		//
		//

		//check if market exists;
		const market = await prisma.market.findUnique({
			where: {
				name_county: {
					name,
					county,
				},
			},
		});
		if (market)
			return res
				.status(400)
				.json({ error: "This market has already been created." });
		// if does not exist;
		const newMarket = await prisma.market.create({
			data: {
				name,
				location,
				county,
			},
		});
		// return response;
		return res.status(201).json({
			message: `${newMarket.name} market created successfully`,
			market: newMarket,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const getAllMarkets = async (req, res) => {
	try {
		const markets = await prisma.market.findMany({
			include: {
				county: {
					select: {
						name: true,
					},
				},
			},
		});

		return res.status(200).json({ markets });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const createStall = async (req, res) => {
	const marketId = req.params.marketId;
	const { stallNumber, type, monthlyRent } = req.body;

	try {
		// TODO -> Only admin can create stalls;
		//
		//
		//
		//
		// check if market exists;
		const market = await prisma.market.findUnique({
			where: {
				id: marketId,
			},
		});
		if (!market)
			return res.status(404).json({ error: "This market does not exists" });
		// if market is present, check if stall exists;
		const stall = await prisma.stall.findUnique({
			where: {
				marketId_stallNumber: {
					stallNumber,
					marketId,
				},
			},
		});
		if (stall)
			return res
				.status(400)
				.json({ error: "This stall has already been created" });
		// if does not exists then create the stall;
		const newStall = await prisma.stall.create({
			data: {
				stallNumber,
				type,
				monthlyRent,
				market: {
					connect: { id: marketId },
				},
			},
		});
		// finally return response;
		return res.status(201).json({
			message: `Stall ${newStall.stallNumber} created successfully`,
			stall: newStall,
			market,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const getAllStallsInAMarket = async (req, res) => {
	const marketId = req.params.marketId;
	const page = parseInt(req.query.page, 10) || 1; // default: page 1
	const limit = parseInt(req.query.limit, 10) || 10; // default: 10 stalls per page
	const skip = (page - 1) * limit;

	try {
		// check if market exists;
		const market = await prisma.market.findUnique({
			where: {
				id: marketId,
			},
		});
		if (!market)
			return res.status(404).json({ error: "This market does not exists" });

		// then fetch the market stalls with pagination; select only needed fields
		const stalls = await prisma.stall.findMany({
			where: { marketId },
			skip,
			take: limit,
			select: {
				id: true,
				marketId: true,
				stallNumber: true,
				type: true,
				status: true,
				monthlyRent: true,
				createdAt: true,
			},
		});

		// Count total stalls for pagination info
		const totalStalls = await prisma.stall.count({ where: { marketId } });

		// return response;
		return res.status(200).json({
			market,
			pagination: {
				totalStalls,
				limit,
				page,
				totalPages: Math.ceil(totalStalls / limit),
			},
			stalls,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const getASingleMarketAndItsStalls = async (req, res) => {
	const marketId = req.params.marketId;
	const limit = parseInt(req.query.limit, 10) || 10;
	const page = parseInt(req.query.page, 10) || 1;
	const skip = (page - 1) * limit;

	try {
		// check if market exists;
		const market = await prisma.market.findUnique({
			where: {
				id: marketId,
			},
		});
		if (!market)
			return res.status(404).json({
				error: "This market was not found",
			});

		// then fetch its stalls;
		const stalls = await prisma.stall.findMany({
			where: {
				marketId,
			},
			skip,
			take: limit,
		});

		// count total stalls in market;
		const totalStalls = await prisma.stall.count({
			where: { marketId },
		});
		// return response:
		return res.status(200).json({
			pagination: {
				totalStalls,
				page,
				limit,
				totalPages: Math.ceil(totalStalls / limit),
			},
			market,
			stalls,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const updateMarket = async (req, res) => {
	const marketId = req.params.marketId;
	const { name, location, county } = req.body;
	try {
		// TODO -> only admin should update market;
		//
		//
		//
		//
		// check if market exist;
		const market = await prisma.market.findUnique({
			where: {
				id: marketId,
			},
		});
		if (!market)
			return res.status(404).json({ error: "This market does no exist" });

		const updatedMarket = await prisma.market.update({
			where: { id: marketId },
			data: { name, county, location },
		});

		return res.status(200).json({
			message: `${updatedMarket.name} was updated successfully`,
			market: updatedMarket,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Internal server error",
		});
	}
};

export const deleteAMarket = async (req, res) => {
	const { marketId } = req.params;
	try {
		//⏳ TODO -> only allow admin to delete a market;
		//
		//
		//
		// check if market has been deleted;
		const market = await prisma.market.findUnique({ where: { id: marketId } });
		if (!market)
			return res.status(404).json({ error: "This market no longer exists" });
		// delete if exists;
		const deletedMarket = await prisma.market.delete({
			where: { id: marketId },
		});

		return res.status(200).json({
			message: `${deletedMarket.name} was deleted successfully`,
			market: deletedMarket,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error" });
	}
};