import connectDB from '@/db/connection';
import { vehicleType } from '@/db/schema';

import { VehicleTypes } from './vehicleModel';

export const vehicleRepository = {
  findAllAsync: async (page: number, limit: number): Promise<VehicleTypes[]> => {
    const { DB } = await connectDB();
    return await DB.select()
      .from(vehicleType)
      .limit(limit)
      .offset(page * limit);
  },
};
