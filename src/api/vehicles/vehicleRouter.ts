import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

import { QueryParamsSchema, VehicleSchema, VehicleTypesSchema } from './vehicleModel';
import { vehicleService } from './vehicleService';

export const vehicleRegistry = new OpenAPIRegistry();
export const vehicleTypesRegistry = new OpenAPIRegistry();

vehicleRegistry.register('Vehicle', VehicleSchema);
vehicleTypesRegistry.register('VehicleTypes', VehicleTypesSchema);

export const vehicleRouter: Router = (() => {
  const router = express.Router();

  vehicleRegistry.registerPath({
    method: 'get',
    path: '/api/v1/vehicles/types',
    tags: ['Vehicle'],
    responses: createApiResponse(z.array(VehicleTypesSchema), 'Success'),
  });

  router.get('/types', validateRequest(QueryParamsSchema), async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 0;
    const limit = parseInt(req.query.limit as string) || 10;

    const serviceResponse = await vehicleService.findAll(page, limit);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
