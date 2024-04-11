import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export type Booking = z.infer<typeof BookingSchema>;
export type BookingRequestBody = z.infer<typeof BookingRequestBodySchema>['body'];

export const BookingSchema = z.object({
  id: z.number(),
  vehicleId: z.number({ required_error: 'vehicleId required' }),
  firstName: z.string({ required_error: 'firstName required' }),
  lastName: z.string({ required_error: 'lastName required' }),
  startDate: z.coerce.date({ invalid_type_error: 'invalid startdate' }),
  endDate: z.coerce.date({ invalid_type_error: 'invalid startdate' }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const BookingRequestBodySchema = z.object({
  body: BookingSchema.omit({ id: true, createdAt: true, updatedAt: true }),
});
