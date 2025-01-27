import { Request, Response } from "express";
import Task from "../models/task.model";

const getAllTasks = async (req: Request, res: Response): Promise<void> => {
	try {
		const tasks = await Task.findAll();
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({
			error: error instanceof Error ? error.message : "An error occurred",
		});
	}
};

const getTasksByUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { userId } = req.params;

		const tasks = await Task.findAll({ where: { userId } });

		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({
			error: error instanceof Error ? error.message : "An error occurred",
		});
	}
};

const createTask = async (req: Request, res: Response): Promise<void> => {
	try {
		const { userId } = req.params;
		const { title, description } = req.body;

		const newTask = await Task.create({ title, description, userId });

		res.status(201).json(newTask);
	} catch (error) {
		res.status(500).json({
			error: error instanceof Error ? error.message : "An error occurred",
		});
	}
};

const updateTask = async (req: Request, res: Response): Promise<void> => {
	try {
		const { title, description } = req.body;
		const task = await Task.findByPk(req.params.id);

		if (!task) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		await task.update({ title, description });
		res.json(task);
	} catch (error) {
		res.status(500).json({
			error:
				error instanceof Error ? error.message : "An unexpected error occurred",
		});
	}
};

const deleteTask = async (req: Request, res: Response): Promise<void> => {
	try {
		const task = await Task.findByPk(req.params.id);

		if (!task) {
			res.status(404).json({ message: "Task not found" });
			return;
		}

		await task.destroy();
		res.json({ message: "User deleted successfully" });
	} catch (error) {
		res.status(500).json({
			error:
				error instanceof Error ? error.message : "An unexpected error occurred",
		});
	}
};

export const taskController = {
	getAllTasks,
	getTasksByUser,
	createTask,
	updateTask,
	deleteTask,
};
