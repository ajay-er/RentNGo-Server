import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

import { Vehicle, VehicleTypes } from './vehicleModel';
import { vehicleRepository } from './vehicleRepository';

export const vehicleService = {
  findAll: async (wheels: number, page: number, limit: number): Promise<ServiceResponse<VehicleTypes[] | null>> => {
    try {
      const vehiclesTypes = await vehicleRepository.findAllAsync(wheels, page, limit);
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
  findById: async (id: number, page: number, limit: number): Promise<ServiceResponse<Vehicle[] | null>> => {
    try {
      const vehicles = await vehicleRepository.findbyId(id, page, limit);
      if (!vehicles || !vehicles.length) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Vehicles found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Vehicle[]>(ResponseStatus.Success, 'Vehicles found', vehicles, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all vehicle types: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
