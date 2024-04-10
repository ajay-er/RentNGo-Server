import { z } from 'zod';

export const commonValidations = {
  id: z
    .string()
    .refine((data) => !isNaN(Number(data)), 'ID must be a numeric value')
    .transform(Number)
    .refine((num) => num > 0, 'ID must be a positive number'),
  pagination: z
    .number()
    .optional()
    .refine((data) => !isNaN(Number(data)), 'value must be a numeric value')
    .transform(Number)
    .refine((num) => num > 0, 'value must be a positive number'),
};
