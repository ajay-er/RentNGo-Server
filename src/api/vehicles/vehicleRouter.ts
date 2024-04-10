import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { commonValidations } from '@/common/utils/commonValidation';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

import { QueryIdSchema, VehicleSchema, VehicleTypesSchema, VehicleWheelsSchema } from './vehicleModel';
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
    request: {
      query: z.object({
        page: commonValidations.pagination,
        limit: commonValidations.pagination,
      }),
    },
    responses: createApiResponse(z.array(VehicleTypesSchema), 'Success'),
  });

  router.get('/types', validateRequest(VehicleWheelsSchema), async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 0;
    const limit = parseInt(req.query.limit as string) || 10;
    const { wheels } = req.body;
    const serviceResponse = await vehicleService.findAll(wheels, page, limit);
    handleServiceResponse(serviceResponse, res);
  });

  vehicleRegistry.registerPath({
    method: 'get',
    path: '/api/v1/vehicles/models',
    tags: ['Vehicle'],
    request: {
      query: z.object({
        typeId: z.number().openapi({ example: 1 }),
        page: commonValidations.pagination,
        limit: commonValidations.pagination,
      }),
    },
    responses: createApiResponse(z.array(VehicleSchema), 'Success'),
  });

  router.get('/models', validateRequest(QueryIdSchema), async (req: Request, res: Response) => {
    const typeId = parseInt(req.query.typeId as string);
    const page = parseInt(req.query.page as string) || 0;
    const limit = parseInt(req.query.limit as string) || 10;
    const serviceResponse = await vehicleService.findById(typeId, page, limit);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
