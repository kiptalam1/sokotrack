import { validationResult } from "express-validator";

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const firstError = errors.array()[0];
		// Override any existing error handlers
		res.status(400);
		res.set("Content-Type", "application/json");
		res.end(JSON.stringify({ error: firstError.msg }));
		return;
	}
	next();
};
