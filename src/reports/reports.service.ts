import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  FindAllOccupants() {
    return `This action returns all reports for occupants`;
  }
  FindAllRevenue() {
    return `This action returns all reports for revenue`;
  }
  FindAllRooms() {
    return `This action returns all reports for rooms`;
  }

}
