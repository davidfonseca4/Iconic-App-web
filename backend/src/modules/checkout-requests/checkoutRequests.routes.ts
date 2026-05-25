import { Router } from "express";
import { createCheckoutRequest } from "./checkoutRequests.controller";

const checkoutRequestsRouter = Router();

checkoutRequestsRouter.post("/", createCheckoutRequest);

export { checkoutRequestsRouter };
