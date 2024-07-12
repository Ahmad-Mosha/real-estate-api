import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// This function can be modified to accept a ConfigService parameter if needed
export const databaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres', // Example for PostgreSQL
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // Be cautious with this in production
});
