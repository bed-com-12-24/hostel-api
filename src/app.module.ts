import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [AuthModule, PaymentModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
