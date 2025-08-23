import express from "express";
import { verifyAccessToken } from "../middlewares/token.middlewares.js";
import { handleValidationErrors } from "../middlewares/validationErrors.middlewares.js";
import { getASingleStallDetails } from "../controllers/stall.controllers.js";

const router = express.Router();

router.get("/:id", verifyAccessToken, getASingleStallDetails);

export default router;
