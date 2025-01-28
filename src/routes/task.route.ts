import { Router } from 'express';
import { taskController } from '../controllers/task.controller';
import { validateSchema } from '../middlewares/validator.middleware';
import { createTaskSchema, updateTaskSchema } from '../validators/task.validator';
import { verifyToken } from '../middlewares/jwt.middleware';

const router = Router();

router.get('/tasks', verifyToken, taskController.getAllTasks);
router.get('/:userId', verifyToken, taskController.getTasksByUser);
router.post('/:userId', verifyToken, validateSchema(createTaskSchema), taskController.createTask);
router.put('/:id', verifyToken, validateSchema(updateTaskSchema), taskController.updateTask);
router.delete('/:id', verifyToken, taskController.deleteTask);

export default router;
