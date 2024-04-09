import 'dotenv/config';

import { migrate } from 'drizzle-orm/mysql2/migrator';

import dbConnect from './dbConnect';

const migration = async () => {
  try {
    const { connection, db } = await dbConnect();

    await migrate(db, { migrationsFolder: './migrations' });
    console.log('Migration completed');

    await connection.end();
    console.log('Database connection closed');
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
};

migration();
