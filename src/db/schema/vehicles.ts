import { boolean, int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

import { vehicleType } from './vehicleType';

export const vehicles = mysqlTable('vehicles', {
  id: int('id').primaryKey().autoincrement(),
  typeId: int('type_id').references(() => vehicleType.id),
  name: varchar('name', { length: 100 }).unique().notNull(),
  isAvailable: boolean('is_available').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});
