import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

import { VehicleTypes } from './vehicleModel';
import { vehicleRepository } from './vehicleRepository';

export const vehicleService = {
  findAll: async (page: number, limit: number): Promise<ServiceResponse<VehicleTypes[] | null>> => {
    try {
      const vehiclesTypes = await vehicleRepository.findAllAsync(page, limit);
      if (!vehiclesTypes) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Vehicle types found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<VehicleTypes[]>(
        ResponseStatus.Success,
        'Vehicle types found',
        vehiclesTypes,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error finding all vehicle types: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
