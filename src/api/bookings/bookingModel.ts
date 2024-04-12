import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const BookingSchema = z
  .object({
    id: z.number(),
    vehicleId: z.number({ required_error: 'vehicleId required' }),
    firstName: z.string({ required_error: 'firstName required' }),
    lastName: z.string({ required_error: 'lastName required' }),
    startDate: z.coerce.date().refine((data) => data > new Date(), { message: 'Start date must be in the future' }),
    endDate: z.coerce.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .omit({ id: true, createdAt: true, updatedAt: true })
  .refine((data) => data.endDate > data.startDate, {
    message: 'End date cannot be earlier than start date.',
    path: ['endDate'],
  });

export const BookingRequestBodySchema = z.object({
  body: BookingSchema,
});

export type Booking = z.infer<typeof BookingSchema>;
export type BookingRequestBody = z.infer<typeof BookingRequestBodySchema>['body'];
