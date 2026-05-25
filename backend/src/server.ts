import { app } from "./app";
import { env } from "./config/env";
import { connectMongo } from "./db/mongo";
import { testMysqlConnection } from "./db/mysql";

const bootstrap = async (): Promise<void> => {
  try {
    await testMysqlConnection();
    await connectMongo();
    app.listen(env.port, () => {
      console.log(`Backend running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start backend:", error);
    process.exit(1);
  }
};

void bootstrap();
