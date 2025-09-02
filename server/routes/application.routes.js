import express from "express";
import { verifyAccessToken } from "../middlewares/token.middlewares.js";
import {
	applyForStall,
	getMyApplications,
} from "../controllers/application.controller.js";

const router = express.Router();

router.post("/apply", verifyAccessToken, applyForStall);
router.get("/my-applications", verifyAccessToken, getMyApplications);

export default router;
