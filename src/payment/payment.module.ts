import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { payment } from './entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([payment])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
