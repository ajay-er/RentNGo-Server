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

export const VehicleWheelsSchema = z
  .object({
    body: z.object({
      wheels: z.number(),
    }),
  })
  .refine((data) => data.body.wheels === 4 || data.body.wheels === 2, {
    message: 'The number of wheels must be either 4 or 2',
  });

export enum VehicleCategory {
  Car = 'Car',
  Bike = 'Bike',
}
