import jwt from "jsonwebtoken";

export const verifyAccessToken = async (req, res, next) => {
	try {
		const authHeader = req.headers["authorization"];
		const token = authHeader && authHeader.split(" ")[1];
		if (!token)
			return res.status(401).json({ error: "Access denied. Please login" });

		const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		console.log(error);
		if (error.name === "TokenExpiredError") {
			return res.status(401).json({ error: "Access token expired" });
		}
		if (error.name === "JsonWebTokenError") {
			return res.status(401).json({ error: "Invalid access token" });
		}
		return res.status(500).json({ error: "Internal server error" });
	}
};
