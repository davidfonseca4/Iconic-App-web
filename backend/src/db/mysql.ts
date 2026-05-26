import mysql from "mysql2/promise";
import { env } from "../config/env";

export const mysqlPool = mysql.createPool({
  host: env.mysql.host,
  port: env.mysql.port,
  user: env.mysql.user,
  password: env.mysql.password,
  database: env.mysql.database,
  waitForConnections: true,
  connectionLimit: env.mysql.connectionLimit,
  queueLimit: 0
});

let mysqlConnected = false;

export const testMysqlConnection = async (): Promise<void> => {
  try {
    const connection = await mysqlPool.getConnection();
    console.log("🎉 MySQL connected successfully! Using database catalog.");
    connection.release();
    mysqlConnected = true;
  } catch (error) {
    console.warn("⚠️ MySQL connection failed. Falling back to static memory catalog.");
    mysqlConnected = false;
  }
};

export const isMysqlAvailable = (): boolean => mysqlConnected;
