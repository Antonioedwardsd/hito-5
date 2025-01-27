import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/jwt.middleware";

const router = Router();

router.get("/", verifyToken, userController.getAllUsers);

router.get("/:id", verifyToken, userController.getUserById);

router.post("/", verifyToken, userController.createUser);

router.put("/:id", verifyToken, userController.updateUser);

router.delete("/:id", verifyToken, userController.deleteUser);

export default router;
