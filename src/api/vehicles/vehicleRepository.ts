import { and, eq } from 'drizzle-orm';

import connectDB from '@/db/connection';
import { vehicles, vehicleType } from '@/db/schema';

import { Vehicle, VehicleTypes } from './vehicleModel';

export const vehicleRepository = {
  findAllAsync: async (page: number, limit: number): Promise<VehicleTypes[]> => {
    const { DB } = await connectDB();
    return await DB.select()
      .from(vehicleType)
      .limit(limit)
      .offset(page * limit);
  },
  findbyId: async (typeId: number, page: number, limit: number): Promise<Vehicle[]> => {
    const { DB } = await connectDB();
    return await DB.select()
      .from(vehicles)
      .where(and(eq(vehicles.typeId, typeId), eq(vehicles.isAvailable, true)))
      .limit(limit)
      .offset(page * limit);
  },
};
