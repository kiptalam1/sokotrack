import express from "express";
import { verifyAccessToken } from "../middlewares/token.middlewares.js";
import {
	marketValidators,
	stallValidators,
} from "../validators/market.validators.js";
import { handleValidationErrors } from "../middlewares/validationErrors.middlewares.js";
import {
	createMarket,
	getAllMarkets,
	createStall,
	getAllStallsInAMarket,
	getASingleMarketAndItsStalls,
} from "../controllers/market.controllers.js";

const router = express.Router();

// routes;
router.post(
	"/",
	verifyAccessToken,
	marketValidators,
	handleValidationErrors,
	createMarket
);
router.get("/", verifyAccessToken, getAllMarkets);
router.post(
	"/:marketId/stall",
	verifyAccessToken,
	stallValidators,
	handleValidationErrors,
	createStall
);
router.get("/:marketId/stalls", verifyAccessToken, getAllStallsInAMarket);
router.get("/:marketId", verifyAccessToken, getASingleMarketAndItsStalls);


export default router;
