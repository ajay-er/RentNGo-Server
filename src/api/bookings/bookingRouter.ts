import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

import { BookingRequestBody, BookingRequestBodySchema, BookingSchema } from './bookingModel';
import { bookingService } from './bookingService';

export const bookingRegistry = new OpenAPIRegistry();

bookingRegistry.register('Booking', BookingSchema);

export const bookingRouter: Router = (() => {
  const router = express.Router();

  bookingRegistry.registerPath({
    method: 'post',
    path: '/api/v1/booking/submit',
    tags: ['Booking'],
    responses: createApiResponse(z.array(BookingSchema), 'Success'),
  });

  router.post('/submit', validateRequest(BookingRequestBodySchema), async (req: Request, res: Response) => {
    const data: BookingRequestBody = req.body;
    const serviceResponse = await bookingService.insert(data);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
