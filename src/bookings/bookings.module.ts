import { Module } from '@nestjs/common';
import { TypeOrmModule} from'@nestjs/typeorm';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { booking} from'./entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([booking])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
