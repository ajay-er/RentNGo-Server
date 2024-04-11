import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

import { Vehicle } from '../vehicles/vehicleModel';
import { BookingRequestBody } from './bookingModel';
import { bookingRepository } from './bookingRepository';

export const bookingService = {
  insert: async (data: BookingRequestBody): Promise<ServiceResponse<Vehicle | null>> => {
    try {
      const vehicle = await bookingRepository.insert(data);
      if (!vehicle) {
        return new ServiceResponse(ResponseStatus.Failed, 'Booking failed', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Vehicle>(ResponseStatus.Success, 'Vehicle booked!', vehicle, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error booking vehicle: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
