import express from "express";
import { verifyAccessToken } from "../middlewares/token.middlewares.js";
import {
	applyForStall,
	getAllApplications,
	getMyApplications,
} from "../controllers/application.controller.js";

const router = express.Router();

router.post("/apply", verifyAccessToken, applyForStall);
router.get("/my-applications", verifyAccessToken, getMyApplications);
router.get("/all-applications", verifyAccessToken, getAllApplications);


export default router;
