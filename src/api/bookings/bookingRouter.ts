import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

import { Booking, BookingRequestBodySchema, BookingSchema } from './bookingModel';
import { bookingService } from './bookingService';

export const bookingRegistry = new OpenAPIRegistry();

bookingRegistry.register('Booking', BookingSchema);

export const bookingRouter: Router = (() => {
  const router = express.Router();

  bookingRegistry.registerPath({
    method: 'post',
    path: '/api/v1/booking/submit',
    tags: ['Booking'],
    request: {
      body: {
        description: 'checking',
        content: {
          'application/json': {
            schema: BookingSchema,
            example: {
              vehicleId: 1,
              firstName: 'Jhon',
              lastName: 'Doe',
              startDate: '2024-04-12T08:30:00Z',
              endDate: '2024-05-18T08:30:00Z',
            },
          },
        },
        required: true,
      },
    },
    responses: createApiResponse(z.array(BookingSchema), 'Success'),
  });

  router.post('/submit', validateRequest(BookingRequestBodySchema), async (req: Request, res: Response) => {
    const data: Booking = req.body;
    const serviceResponse = await bookingService.insert(data);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
