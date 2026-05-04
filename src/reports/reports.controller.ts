import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Controller('api/reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('/occupancy')
  FindAllOccupants() {
    return this.reportsService.FindAllOccupants();
  }

   @Get('/revenue')
  FindAllRevenue() {
    return this.reportsService.FindAllRevenue();
  }

   @Get('/rooms')
  FindAllRooms() {
    return this.reportsService.FindAllRooms();
  }

}
