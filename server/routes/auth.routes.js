import express from "express";
import {
	registerUser,
	loginUser,
	logoutUser,
} from "../controllers/auth.controllers.js";
import {
	registerUserValidator,
	loginUserValidator,
} from "../validators/auth.validators.js";
import { handleValidationErrors } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// endpoints;
router.post(
	"/signup",
	registerUserValidator,
	handleValidationErrors,
	registerUser
);

router.post("/login", loginUserValidator, handleValidationErrors, loginUser);
router.post("/logout", logoutUser);


export default router;
