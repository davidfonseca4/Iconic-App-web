import { Router } from "express";
import { isMongoConnected } from "../db/mongo";
import { mysqlPool } from "../db/mysql";
import { authRouter } from "../modules/auth/auth.routes";
import { checkoutRequestsRouter } from "../modules/checkout-requests/checkoutRequests.routes";
import { productsRouter } from "../modules/products/products.routes";
import { subscribersRouter } from "../modules/subscribers/subscribers.routes";
import { vaultInquiriesRouter } from "../modules/vault-inquiries/vaultInquiries.routes";

const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "backend",
    timestamp: new Date().toISOString()
  });
});

apiRouter.get("/health/mysql", async (_req, res, next) => {
  const startedAt = Date.now();
  try {
    await mysqlPool.query("SELECT 1");
    res.status(200).json({
      ok: true,
      database: "mysql",
      latencyMs: Date.now() - startedAt
    });
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/health/mongo", (_req, res) => {
  if (!isMongoConnected()) {
    res.status(500).json({
      ok: false,
      error: "MONGO_UNAVAILABLE"
    });
    return;
  }

  res.status(200).json({
    ok: true,
    database: "mongo"
  });
});

apiRouter.use("/products", productsRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/subscribe", subscribersRouter);
apiRouter.use("/vault-inquire", vaultInquiriesRouter);
apiRouter.use("/checkout", checkoutRequestsRouter);

export { apiRouter };
