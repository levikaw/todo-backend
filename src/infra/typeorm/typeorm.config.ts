import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config({ path: '../../../.env' });

const entities = [__dirname + '/../../modules/**/*.entity{.ts,.js}'];

const migrations = [__dirname + '/../../../database/migrations/*{.ts,.js}'];

export const getTypeOrmOptions = (): TypeOrmModuleAsyncOptions => {
  return {
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      type: 'postgres',
      entities,
      migrations,
      logging: true,
      host: config.get<string>('DATABASE_HOST'),
      port: config.get<number>('DATABASE_PORT'),
      username: config.get<string>('DATABASE_USER'),
      password: config.get<string>('DATABASE_PASSWORD'),
      database: config.get<string>('DATABASE_DB'),
      autoLoadEntities: true,
      synchronize: true,
      migrationsRun: true,
    }),
  };
};

export const migrationConfig = new DataSource({
  type: 'postgres',
  entities,
  migrations,
  logging: true,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  synchronize: true,
  migrationsRun: true,
});
