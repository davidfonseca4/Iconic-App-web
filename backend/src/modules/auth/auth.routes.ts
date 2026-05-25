import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { login, me, register } from "./auth.controller";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", authMiddleware, me);

export { authRouter };
