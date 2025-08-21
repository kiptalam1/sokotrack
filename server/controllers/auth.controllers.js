import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/password.utils.js";

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
