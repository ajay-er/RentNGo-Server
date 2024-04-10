import 'dotenv/config';

import { migrate } from 'drizzle-orm/mysql2/migrator';

import dbConnect from './connection';

const migration = async () => {
  try {
    const { connection, DB } = await dbConnect();

    await migrate(DB, { migrationsFolder: 'src/db/migrations' });
    console.log('Migration completed');

    await connection.end();
    console.log('Database connection closed');
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
};

migration();
