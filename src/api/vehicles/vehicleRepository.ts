import { and, eq } from 'drizzle-orm';

import connectDB from '@/db/connection';
import { vehicles, vehicleType } from '@/db/schema';

import { Vehicle, VehicleCategory, VehicleTypes } from './vehicleModel';

export const vehicleRepository = {
  findAllAsync: async (wheels: number, page: number, limit: number): Promise<VehicleTypes[]> => {
    const { DB } = await connectDB();
    const type = wheels === 4 ? VehicleCategory.Car : VehicleCategory.Bike;
    return await DB.select()
      .from(vehicleType)
      .where(eq(vehicleType.category, type))
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
