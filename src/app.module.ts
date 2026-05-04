import { Hostel } from './hostels/entities/hostel.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HostelsController } from './hostels/hostels.controller';
import { HostelsService } from './hostels/hostels.service';
import { HostelsModule } from './hostels/hostels.module';
import { TypeOrmModule
 } from '@nestjs/typeorm';
 
 import { ConfigModule } from '@nestjs/config';
import { BookingsModule } from './bookings/bookings.module';
 
 


@Module({
  imports:[
  ConfigModule.forRoot({ isGlobal: true }),
  
  TypeOrmModule.forRoot({
  type: 'oracle',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '1521'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  serviceName: process.env.DB_SERVICE_NAME,
  synchronize: true,
  entities: [Hostel],
  logging: true,

}),HostelsModule, BookingsModule],
  
})
export class AppModule {}


