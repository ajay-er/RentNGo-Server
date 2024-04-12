import type { Config } from 'drizzle-kit';

import { env } from './src/common/utils/envConfig';

export default {
  schema: './src/db/schema/*',
  out: './src/db/migrations',
  driver: 'mysql2',
  dbCredentials: {
    host: env.DATABASE_HOST,
    user: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    port: env.DATABASE_PORT,
  },
} satisfies Config;
