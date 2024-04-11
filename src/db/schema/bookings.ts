import { datetime, int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

import { vehicles } from './vehicles';

export const bookings = mysqlTable('bookings', {
  id: int('id').primaryKey().autoincrement(),
  vehicleId: int('vehicle_id').references(() => vehicles.id),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  startDate: datetime('start_date').notNull(),
  endDate: datetime('end_date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});
