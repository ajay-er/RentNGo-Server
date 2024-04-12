import { drizzle, MySql2Client, MySql2Database } from 'drizzle-orm/mysql2';
import { Connection, Pool } from 'mysql2';
import mysql from 'mysql2/promise';

import { env } from '@/common/utils/envConfig';

const { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USERNAME, DATABASE_PORT } = env;

let connection: MySql2Client | Pool | Connection | null = null;
let DB: MySql2Database<Record<string, never>> | null = null;

async function connectDB() {
  try {
    if (!connection) {
      connection = await mysql.createConnection({
        host: DATABASE_HOST,
        user: DATABASE_USERNAME,
        database: DATABASE_NAME,
        password: DATABASE_PASSWORD,
        port: DATABASE_PORT,
      });
      DB = drizzle(connection);
    }

    if (!DB) {
      throw new Error('Database connection is not initialized');
    }

    return { connection, DB };
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

export default connectDB;
