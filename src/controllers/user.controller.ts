import { Request, Response } from "express";
import User from "../models/user.model";
import Task from "../models/task.model";

const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.findAll({
			include: [
				{
					model: Task,
					attributes: ["id", "title", "description"],
				},
			],
			attributes: { exclude: ["createdAt", "updatedAt"] },
		});
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({
			error:
				error instanceof Error ? error.message : "An unexpected error occurred",
		});
	}
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
	try {
		const user = await User.findByPk(req.params.id);
		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}
		res.json(user);
	} catch (error) {
		res.status(500).json({
			error:
				error instanceof Error ? error.message : "An unexpected error occurred",
		});
	}
};

const createUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			res.status(400).json({ message: "Email already in use" });
			return;
		}

		const newUser = await User.create({ email, password });
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({
			error:
				error instanceof Error ? error.message : "An unexpected error occurred",
		});
	}
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body;
		const user = await User.findByPk(req.params.id);

		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		await user.update({ email, password });
		res.json(user);
	} catch (error) {
		res.status(500).json({
			error:
				error instanceof Error ? error.message : "An unexpected error occurred",
		});
	}
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const user = await User.findByPk(req.params.id);

		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		await user.destroy();
		res.json({ message: "User deleted successfully" });
	} catch (error) {
		res.status(500).json({
			error:
				error instanceof Error ? error.message : "An unexpected error occurred",
		});
	}
};

export const userController = {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
};
