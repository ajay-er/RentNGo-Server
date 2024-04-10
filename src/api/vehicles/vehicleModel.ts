import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export type Vehicle = z.infer<typeof VehicleSchema>;
export const VehicleSchema = z.object({
  id: z.number(),
  typeId: z.number().nullable(),
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

export const QueryIdSchema = z.object({
  query: z.object({
    typeId: commonValidations.id,
  }),
});
