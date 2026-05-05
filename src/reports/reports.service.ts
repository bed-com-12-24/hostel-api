import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report, PaymentStatus } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  create(createReportDto: CreateReportDto) {
    return this.reportRepository.save(createReportDto);
  }

  findAll() {
    return this.reportRepository.find({ order: { createdAt: 'DESC' } });
  }

  findOne(id: number) {
    return this.reportRepository.findOne({ where: { id } });
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return this.reportRepository.update(id, updateReportDto);
  }

  remove(id: number) {
    return this.reportRepository.delete(id);
  }

  async FindAllOccupants() {
    return this.reportRepository.find({
      where: { status: PaymentStatus.COMPLETED },
      order: { createdAt: 'DESC' },
    });
  }

  async FindAllRevenue() {
    const result = await this.reportRepository
      .createQueryBuilder('report')
      .select('SUM(report.amountPaid)', 'totalRevenue')
      .where('report.status = :status', { status: PaymentStatus.COMPLETED })
      .getRawOne();
    return result;
  }

  async FindAllRooms() {
    return this.reportRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
