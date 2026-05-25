import dotenv from "dotenv";

dotenv.config();

const toNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: toNumber(process.env.PORT, 4000),
  frontendOrigin: process.env.FRONTEND_ORIGIN ?? "http://localhost:3000",
  mysql: {
    host: process.env.MYSQL_HOST ?? "127.0.0.1",
    port: toNumber(process.env.MYSQL_PORT, 3306),
    user: process.env.MYSQL_USER ?? "root",
    password: process.env.MYSQL_PASSWORD ?? "",
    database: process.env.MYSQL_DATABASE ?? "iconic_store",
    connectionLimit: toNumber(process.env.MYSQL_CONNECTION_LIMIT, 10)
  },
  mongo: {
    uri: process.env.MONGODB_URI ?? "",
    database: process.env.MONGODB_DB_NAME ?? "iconic_users"
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? "change_me",
    expiresIn: process.env.JWT_EXPIRES_IN ?? "7d"
  },
  smtp: {
    email: process.env.SMTP_EMAIL ?? "",
    password: process.env.SMTP_PASSWORD ?? ""
  }
};
