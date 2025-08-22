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

export default router;
