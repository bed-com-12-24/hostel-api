import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { NotificationModule } from './notification/notification.module';
import { Auth } from './auth/entities/auth.entity';
import { payment } from './payment/entities/payment.entity';

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
                entities: [Notification, payment, Auth], 
                logging: true,
       }),
     }),
     NotificationModule,
     PaymentModule,
     AuthModule
    ]
  })
export class AppModule {}
