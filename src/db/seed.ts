import connectDB from './connection';
import { vehicles, vehicleType } from './schema';

async function seed() {
  try {
    const { DB, connection } = await connectDB();

    const vehicleTypeResult = await DB.insert(vehicleType).values([
      { id: 1, typeName: 'Hatchback', category: 'Car' },
      { id: 2, typeName: 'SUV', category: 'Car' },
      { id: 3, typeName: 'Sedan', category: 'Car' },
      { id: 4, typeName: 'Convertible', category: 'Car' },
      { id: 5, typeName: 'Pickup Truck', category: 'Car' },
      { id: 6, typeName: 'Van', category: 'Car' },
      { id: 7, typeName: 'Minivan', category: 'Car' },
      { id: 8, typeName: 'Sports', category: 'Bike' },
      { id: 9, typeName: 'Cruiser', category: 'Bike' },
      { id: 10, typeName: 'Touring', category: 'Bike' },
    ]);

    const vehicleResult = await DB.insert(vehicles).values([
      { name: 'Toyota Corolla', typeId: 3 },
      { name: 'Honda Civic', typeId: 3 },
      { name: 'Ford Mustang', typeId: 4 },
      { name: 'Chevrolet Silverado', typeId: 5 },
      { name: 'Harley-Davidson Sportster', typeId: 8 },
      { name: 'Volkswagen Golf', typeId: 1 },
      { name: 'Nissan Rogue', typeId: 2 },
      { name: 'BMW 3 Series', typeId: 3 },
      { name: 'Mazda MX-5', typeId: 4 },
      { name: 'Ford F-150', typeId: 5 },
      { name: 'Toyota Sienna', typeId: 7 },
      { name: 'Ducati Panigale', typeId: 8 },
      { name: 'Harley-Davidson Road King', typeId: 9 },
      { name: 'Honda Gold Wing', typeId: 10 },
      { name: 'Audi A4', typeId: 3 },
      { name: 'Mercedes-Benz E-Class', typeId: 3 },
      { name: 'Jeep Wrangler', typeId: 2 },
      { name: 'BMW X5', typeId: 2 },
      { name: 'Kawasaki Ninja', typeId: 8 },
      { name: 'Yamaha R1', typeId: 8 },
      { name: 'Lamborghini Huracan', typeId: 4 },
      { name: 'Tesla Model S', typeId: 3 },
      { name: 'Porsche 911', typeId: 4 },
      { name: 'GMC Sierra', typeId: 5 },
      { name: 'Subaru Outback', typeId: 2 },
      { name: 'Harley-Davidson Street Glide', typeId: 9 },
      { name: 'Indian Scout', typeId: 8 },
      { name: 'BMW R1250GS', typeId: 10 },
      { name: 'KTM Adventure', typeId: 10 },
      { name: 'Honda CR-V', typeId: 2 },
    ]);

    console.log(vehicleTypeResult, vehicleResult);
    console.log('Data seeded successfully.');
    connection.end();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seed();
