import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(booking)
    private readonly bookingRepository: Repository<booking>,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const booking = this.bookingRepository.create({
      ...createBookingDto,
      date: createBookingDto.date ?? new Date(),
    });
    return this.bookingRepository.save(booking);
  }

  findAll() {
    return this.bookingRepository.find();
  }

  async findOne(id: number) {
    const booking = await this.bookingRepository.findOne({ where: { id } });
    if (!booking) {
      throw new NotFoundException(`Booking #${id} not found`);
    }
    return booking;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const booking = await this.bookingRepository.preload({
      id,
      ...updateBookingDto,
    });

    if (!booking) {
      throw new NotFoundException(`Booking #${id} not found`);
    }

    return this.bookingRepository.save(booking);
  }

  async remove(id: number) {
    const result = await this.bookingRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Booking #${id} not found`);
    }
    return { deleted: true };
  }
}
