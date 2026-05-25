import { Router } from "express";
import { createVaultInquiry } from "./vaultInquiries.controller";

const vaultInquiriesRouter = Router();

vaultInquiriesRouter.post("/", createVaultInquiry);

export { vaultInquiriesRouter };
