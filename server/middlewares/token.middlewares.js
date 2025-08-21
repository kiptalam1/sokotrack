import jwt from "jsonwebtoken";

export const verifyAccessToken = async (req, res, next) => {
	try {
		const authHeader = req.headers["authorization"];
		const token = authHeader && authHeader.split(" ")[1];
		if (!token) return res.status(401).json({ error: "Access denied" });

		const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		console.log(error);
		if (err.name === "TokenExpiredError") {
			return res.status(401).json({ error: "Access token expired" });
		}
		if (err.name === "JsonWebTokenError") {
			return res.status(401).json({ error: "Invalid access token" });
		}
		return res.status(500).json({ error: "Internal server error" });
	}
};
