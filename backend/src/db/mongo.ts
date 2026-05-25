import mongoose from "mongoose";
import { env } from "../config/env";

export const connectMongo = async (): Promise<void> => {
  if (!env.mongo.uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  await mongoose.connect(env.mongo.uri, {
    dbName: env.mongo.database
  });
};

export const isMongoConnected = (): boolean => mongoose.connection.readyState === 1;
