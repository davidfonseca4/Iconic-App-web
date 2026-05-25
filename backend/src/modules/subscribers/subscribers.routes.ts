import { Router } from "express";
import { createSubscriber } from "./subscribers.controller";

const subscribersRouter = Router();

subscribersRouter.post("/", createSubscriber);

export { subscribersRouter };
