import { Injectable } from '@nestjs/common';
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

  create(createHostelDto: CreateHostelDto) {
    return this.hostelRepository.save(createHostelDto);
  }

  findAll() {
    return this.hostelRepository.find();
  }

  findOne(id: number) {
    return this.hostelRepository.findOne({ where: { id } });
  }

  update(id: number, updateHostelDto: UpdateHostelDto) {
    return this.hostelRepository.update(id, updateHostelDto);
  }

  remove(id: number) {
    return this.hostelRepository.delete(id);
  }
}
