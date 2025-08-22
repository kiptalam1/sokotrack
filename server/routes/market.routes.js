import express from "express";
import { verifyAccessToken } from "../middlewares/token.middlewares.js";
import { marketValidators } from "../validators/market.validators.js";
import { handleValidationErrors } from "../middlewares/validationErrors.middlewares.js";
import { createMarket } from "../controllers/market.controllers.js";

const router = express.Router();

// routes;
router.post(
	"/",
	verifyAccessToken,
	marketValidators,
	handleValidationErrors,
	createMarket
);

export default router;
