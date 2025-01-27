import bcrypt from "bcryptjs";
import User from "../models/user.model";

const getAllUsers = async () => {
	return await User.findAll();
};

const getUserByEmail = async (email: string) => {
	return await User.findOne({ where: { email } });
};

const getUserById = async (id: string) => {
	return await User.findByPk(id);
};

const createUser = async (email: string, password: string) => {
	const existingUser = await User.findOne({ where: { email } });

	if (existingUser) {
		throw new Error("Email already in use");
	}

	const saltPassword = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, saltPassword);

	return await User.create({ email, password: hashedPassword });
};

const updateUser = async (id: string, email: string, password: string) => {
	const user = await User.findByPk(id);

	if (!user) {
		throw new Error("User not found");
	}

	const saltPassword = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, saltPassword);

	await user.update({ email, password: hashedPassword });
	return user;
};

const deleteUser = async (id: string) => {
	const user = await User.findByPk(id);

	if (!user) {
		throw new Error("User not found");
	}

	await user.destroy();
	return { message: "User deleted successfully" };
};

export const userService = {
	getAllUsers,
	getUserByEmail,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
};
