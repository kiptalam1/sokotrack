import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

//functions;
// import { globalErrorHandler } from "./middlewares/errors.middlewares.js";
import authRoutes from "./routes/auth.routes.js";
import marketRoutes from "./routes/market.routes.js";
import stallRoutes from "./routes/stall.routes.js";
import applicationRoutes from "./routes/application.routes.js";

const app = express();

//middleware;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Log all requests for debugging
app.use((req, res, next) => {
	console.log("Request received:", req.method, req.url, req.body);
	next();
});

//routes;
app.use((req, res, next) => {
	console.log(req.method, req.url);
	next();
});

// Mount auth routes
app.use("/api/auth", authRoutes);
app.use("/api/markets", marketRoutes);
app.use("/api/stalls", stallRoutes);
app.use("/api/applications", applicationRoutes);


// 404 handler
app.use((req, res) => {
	console.log("404 - Route not found:", req.method, req.url);
	res.status(404).json({ error: "Route not found" });
});

// Global error handler must come last
// app.use(globalErrorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Server running at port" + " " + PORT));
