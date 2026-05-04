import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingsModule } from './bookings/bookings.module';
import { config } from 'process';
import { booking } from './bookings/entities/booking.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'oracle',
        host: config.get('BD_HOST'),
        port: parseInt(config.get('DB_PORT') ?? '1521'),
        password: config.get('DB_PASSWORD'), 
        serviceName: config.get('DB_SERVICE_NAME'), 
        synchronize: config.get('DB_SYNCHRONIZE') === 'true', 
        entities: [booking],
        logging: true,
      }),
    }),
    
    BookingsModule,
  ],
})
export class AppModule {}
