import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createReportDto: CreateReportDto) {
    const report = this.reportRepository.create(createReportDto);
    return this.reportRepository.save(report);
  }

  findAll() {
    return this.reportRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number) {
    const report = await this.reportRepository.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException(`Report #${id} not found`);
    }
    return report;
  }

  async update(id: number, updateReportDto: UpdateReportDto) {
    const report = await this.reportRepository.preload({ id, ...updateReportDto });
    if (!report) {
      throw new NotFoundException(`Report #${id} not found`);
    }
    return this.reportRepository.save(report);
  }

  async remove(id: number) {
    const result = await this.reportRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Report #${id} not found`);
    }
    return { message: `Report ${id} deleted successfully` };
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
