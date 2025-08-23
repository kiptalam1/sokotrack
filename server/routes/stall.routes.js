import express from "express";
import { verifyAccessToken } from "../middlewares/token.middlewares.js";
import { handleValidationErrors } from "../middlewares/validationErrors.middlewares.js";
import {
	getASingleStallDetails,
	updateStall,
	deleteAStall,
} from "../controllers/stall.controllers.js";
import { updateStallValidators } from "../validators/market.validators.js";

const router = express.Router();

router.get("/:id", verifyAccessToken, getASingleStallDetails);
router.patch(
	"/:id",
	verifyAccessToken,
	updateStallValidators,
	handleValidationErrors,
	updateStall
);
router.delete("/:id", verifyAccessToken, deleteAStall);


export default router;
