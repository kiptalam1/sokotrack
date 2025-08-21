import jwt from "jsonwebtoken";

export const generateTokens = (user) => {
	const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_SECRET, {
		expiresIn: "15m",
	});

	const refreshToken = jwt.sign(
		{ userId: user.id },
		process.env.REFRESH_SECRET,
		{ expiresIn: "7d" }
	);

	return { accessToken, refreshToken };
};

export const refreshAccessToken = (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		if (!refreshToken) {
			return res.status(401).json({ error: "No refresh token provided" });
		}

		const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

		const newAccessToken = jwt.sign(
			{ userId: decoded.userId },
			process.env.ACCESS_SECRET,
			{ expiresIn: "15m" }
		);

		return res.json({ accessToken: newAccessToken });
	} catch (err) {
		if (err.name === "TokenExpiredError") {
			return res.status(401).json({ error: "Refresh token expired" });
		}
		if (err.name === "JsonWebTokenError") {
			return res.status(401).json({ error: "Invalid refresh token" });
		}
		return res.status(500).json({ error: "Internal server error" });
	}
};
