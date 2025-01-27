import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { generateToken } from "../utils/auth.utils";

const loginUser = async (email: string, password: string) => {
	const user = await User.findOne({ where: { email } });

	if (!user) {
		throw new Error("User not found");
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		throw new Error("Invalid password");
	}

	const token = generateToken(user.email, user.uid);
	return token;
};

const registerUser = async (email: string, password: string) => {
	const existingUser = await User.findOne({ where: { email } });

	if (existingUser) {
		throw new Error("Email already in use");
	}

	const saltPassword = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, saltPassword);

	const newUser = await User.create({ email, password: hashedPassword });
	const token = generateToken(newUser.email, newUser.uid);

	return { user: newUser, token };
};

export const authService = {
	loginUser,
	registerUser,
};
