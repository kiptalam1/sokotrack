import express from "express";
import { registerUser } from "../controllers/auth.controllers.js";
import { registerUserValidator } from "../validators/auth.validators.js";
import { handleValidationErrors } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// endpoints;
router.post(
	"/signup",
	registerUserValidator,
	handleValidationErrors,
	registerUser
);

export default router;
