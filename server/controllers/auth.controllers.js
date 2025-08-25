import { PrismaClient } from "@prisma/client";
import { comparePassword, hashPassword } from "../utils/password.utils.js";
import { generateTokens } from "../utils/token.utils.js";

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		// check if user already exists
		const user = await prisma.user.findUnique({
			where: { email },
		});
		if (user) {
			return res
				.status(400)
				.json({ error: "This email is in use. Please log in" });
		}

		// hash password
		const hashedPassword = await hashPassword(password, 12);

		// create new user
		const newUser = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				// role: "trader",
			},
		});

		newUser.password = undefined;
		res.status(201).json({
			message: "Account was created successfully",
			userId: newUser.id,
			newUser,
		});
	} catch (err) {
		// handle Prisma unique constraint violation
		if (err.code === "P2002") {
			return res.status(400).json({ error: "Email already in use" });
		}

		console.error(err);
		res.status(500).json({ error: "Something went wrong" });
	}
};

export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		// check if user exists;
		const user = await prisma.user.findUnique({
			where: { email },
		});
		if (!user)
			return res.status(404).json({ error: "User not found. Please sign up" });
		// compare passwords;
		const isValidPassword = await comparePassword(password, user.password);
		if (!isValidPassword)
			return res.status(400).json({ error: "Incorrect password. Try again" });
		// if valid generate token;
		const { accessToken, refreshToken } = generateTokens(user);
		// set refresh token in httpOnly cookie
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
		});
		// send response;
		user.password = undefined;
		return res.status(200).json({
			message: "Logged in successfully",
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
			accessToken,
		});
	} catch (error) {
		console.error(err);
		res.status(500).json({ error: "Something went wrong" });
	}
};

export const logoutUser = async (req, res) => {
	res.clearCookie("refreshToken", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
	});
	return res.json({ message: "Logged out successfully" });
};

export const getMe = async (req, res) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: req.user.userId },
			select: { id: true, name: true, email: true, role: true },
		});
		if (!user) return res.status(404).json({ error: "User not found" });
		res.json({ user });
	} catch (err) {
		res.status(500).json({ error: "Internal server error" });
	}
};
