import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

import { env } from '@/common/utils/envConfig';

const { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USERNAME } = env;

async function connectDB() {
  try {
    const connection = await mysql.createConnection({
      host: DATABASE_HOST,
      user: DATABASE_USERNAME,
      database: DATABASE_NAME,
      password: DATABASE_PASSWORD,
    });

    const db = drizzle(connection);

    return { connection, db };
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

export default connectDB;
