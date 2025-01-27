import { Router } from "express";
import { taskController } from "../controllers/task.controller";
import { verifyToken } from "../middlewares/jwt.middleware";

const router = Router();

router.get("/tasks", verifyToken, taskController.getAllTasks);

router.get("/:userId", verifyToken, taskController.getTasksByUser);

router.post("/:userId", verifyToken, taskController.createTask);

router.put("/:id", verifyToken, taskController.updateTask);

router.delete("/:id", verifyToken, taskController.deleteTask);

export default router;
