import express from "express";
import { verifyAccessToken } from "../middlewares/token.middlewares.js";
import {
	applyForStall,
	getAllApplications,
	getMyApplications,
	updateApplicationStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

router.post("/apply", verifyAccessToken, applyForStall);
router.get("/my-applications", verifyAccessToken, getMyApplications);
router.get("/all-applications", verifyAccessToken, getAllApplications);
router.patch("/update-status/:id", verifyAccessToken, updateApplicationStatus);

export default router;
