
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { NotificationModule } from './notification/notification.module';
import { Auth } from './auth/entities/auth.entity';
import { payment } from './payment/entities/payment.entity';
import { Notification } from './notification/entities/notification.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingsModule } from './bookings/bookings.module';
import { config } from 'process';
import { booking } from './bookings/entities/booking.entity';
import { HostelsModule } from './hostels/hostels.module';
import { Hostel } from './hostels/entities/hostel.entity';
import { ReportsModule } from './reports/reports.module.js';
import { Report } from './reports/entities/report.entity'
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports:[
    ConfigModule.forRoot({ isGlobal: true }),
     TypeOrmModule.forRootAsync({
      imports: [ConfigModule], 
      inject: [ConfigService],
       useFactory: (config: ConfigService) => ({ 
               type: 'oracle', 
                host: config.get('DB_HOST'), 
                port: parseInt(config.get('DB_PORT') ?? '1521'), 
                username: config.get('DB_USERNAME'), 
                password: config.get('DB_PASSWORD'), 
                serviceName: config.get('DB_SERVICE_NAME'), 
                synchronize: config.get('DB_SYNCHRONIZE') === 'true', 
                entities: [Notification, payment, booking, Report, User, Auth, Hostel], 
                logging: true,
       }),
     }),
     NotificationModule,
     PaymentModule,
     AuthModule,
     BookingsModule,
     HostelsModule,
     ReportsModule,
     UsersModule,
    ]
  })


export class AppModule {}
