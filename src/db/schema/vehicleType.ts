import { int, mysqlEnum, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const vehicleType = mysqlTable('vehicleType', {
  id: int('id').primaryKey().autoincrement(),
  typeName: varchar('type_name', { length: 100 }).unique().notNull(),
  category: mysqlEnum('category', ['Car', 'Bike']).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});
