import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundMiddleware } from "./middlewares/notFound.middleware";
import { apiRouter } from "./routes";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.frontendOrigin
  })
);
app.use(morgan(env.nodeEnv === "development" ? "dev" : "combined"));
app.use(express.json({ limit: "1mb" }));

app.use("/api", apiRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export { app };
