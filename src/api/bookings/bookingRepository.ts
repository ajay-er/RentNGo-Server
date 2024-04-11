import { eq } from 'drizzle-orm';

import connectDB from '@/db/connection';
import { bookings, vehicles } from '@/db/schema';

import { Vehicle } from '../vehicles/vehicleModel';
import { BookingRequestBody } from './bookingModel';

export const bookingRepository = {
  insert: async (data: BookingRequestBody): Promise<Vehicle | undefined> => {
    const { DB } = await connectDB();

    return await DB.transaction(async (tx) => {
      const [vehicle] = await tx.select().from(vehicles).where(eq(vehicles.id, data.vehicleId));

      if (!vehicle || !vehicle.isAvailable) {
        await tx.rollback();
        return;
      }
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);

      await tx.insert(bookings).values({
        firstName: data.firstName,
        lastName: data.lastName,
        vehicleId: data.vehicleId,
        startDate,
        endDate,
      });

      await tx.update(vehicles).set({ isAvailable: false }).where(eq(vehicles.id, data.vehicleId));
      return vehicle;
    });
  },
};
