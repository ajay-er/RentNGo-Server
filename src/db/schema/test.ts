import { InferSelectModel } from 'drizzle-orm';
import { int, mysqlSchema, text } from 'drizzle-orm/mysql-core';

export const testSchema = mysqlSchema('test');

export const mytestSchema = testSchema.table('testing', {
  id: int('id').primaryKey().autoincrement(),
  name: text('name'),
});

export type mytestSchema = InferSelectModel<typeof mytestSchema>;
