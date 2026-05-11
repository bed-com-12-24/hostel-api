 import {Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hostel } from './entities/hostel.entity';
import { CreateHostelDto } from './dto/create-hostel.dto';
import { UpdateHostelDto } from './dto/update-hostel.dto';

@Injectable()
export class HostelsService {
  constructor(
    @InjectRepository(Hostel)
    private readonly hostelRepository: Repository<Hostel>,
  ) {}

  async create(createHostelDto: CreateHostelDto) {
    const hostel = this.hostelRepository.create(createHostelDto);
    return this.hostelRepository.save(hostel);
  }

  findAll() {
    return this.hostelRepository.find();
  }

  async findOne(id: number) {
    const hostel = await this.hostelRepository.findOne({ where: { id } });
    if (!hostel) {
      throw new NotFoundException(`Hostel #${id} not found`);
    }
    return hostel;
  }

  async update(id: number, updateHostelDto: UpdateHostelDto) {
    const hostel = await this.hostelRepository.preload({ id, ...updateHostelDto });
    if (!hostel) {
      throw new NotFoundException(`Hostel #${id} not found`);
    }
    return this.hostelRepository.save(hostel);
  }

  async remove(id: number) {
    const result = await this.hostelRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Hostel #${id} not found`);
    }
    return { message: `Hostel ${id} deleted successfully` };
  }
}
