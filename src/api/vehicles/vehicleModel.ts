import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export type Vehicle = z.infer<typeof VehicleSchema>;
export const VehicleSchema = z.object({
  id: z.number(),
  typeId: z.number(),
  name: z.string(),
  isAvailable: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type VehicleTypes = z.infer<typeof VehicleTypesSchema>;
export const VehicleTypesSchema = z.object({
  id: z.number(),
  typeName: z.string(),
  category: z.enum(['Car', 'Bike']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const QueryParamsSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
});
