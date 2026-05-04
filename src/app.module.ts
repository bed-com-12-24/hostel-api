import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsModule } from './reports/reports.module.js';
import { Report } from './reports/entities/report.entity'
 
 


@Module({
  imports:[
  ConfigModule.forRoot({ isGlobal: true }),
  
  TypeOrmModule.forRoot({
  type: 'oracle',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '1521'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  serviceName: process.env.DB_SERVICE_NAME,
  synchronize: true,
  entities: [ Report ],
  logging: true,

}), ReportsModule],
  
})
export class AppModule {}


