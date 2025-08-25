import express from "express";
import {
	registerUser,
	loginUser,
	logoutUser,
	getMe,
} from "../controllers/auth.controllers.js";
import { verifyAccessToken } from "../middlewares/token.middlewares.js";
import {
	registerUserValidator,
	loginUserValidator,
} from "../validators/auth.validators.js";
import { handleValidationErrors } from "../middlewares/validationErrors.middlewares.js";
import { refreshAccessToken } from "../utils/token.utils.js";

const router = express.Router();

// endpoints;
router.post(
	"/signup",
	registerUserValidator,
	handleValidationErrors,
	registerUser
);

router.post("/login", loginUserValidator, handleValidationErrors, loginUser);
router.get("/refresh", refreshAccessToken);
router.post("/logout", logoutUser);
router.get("/me", verifyAccessToken, getMe);



export default router;
