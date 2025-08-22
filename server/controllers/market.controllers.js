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
			message: "Market created successfully",
			market: newMarket,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const getAllMarkets = async (req, res) => {
	try {
		const markets = await prisma.market.findMany();

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
