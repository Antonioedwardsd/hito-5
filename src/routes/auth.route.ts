import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validateSchema } from '../middlewares/validator.middleware';
import { loginSchema, registerSchema } from '../validators/auth.validator';

const router = Router();

router.post('/login', validateSchema(loginSchema), authController.login);
router.post('/register', validateSchema(registerSchema), authController.register);

export default router;
