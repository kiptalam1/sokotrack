import bcrypt from "bcryptjs";

export const hashPassword = async (password, value) => {
	const hashedPassword = await bcrypt.hash(password, value);
	return hashedPassword;
};

export const comparePassword = async (password, hash) => {
	return bcrypt.compare(password, hash);
};
