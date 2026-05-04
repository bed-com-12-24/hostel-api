import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>

  ){}

  //Create-creates a new notification to the database
  async create(createNotificationDto: CreateNotificationDto): Promise<Notification>{
    const notification = this.notificationRepository.create(createNotificationDto);
    return await this.notificationRepository.save(notification);
  }

  //retrieve all notificatons
  async findAll(): Promise<Notification[]> {
    return await this.notificationRepository.find();
  }

  //read one notification
  async findOne(id: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({where: { id }});
    if(!notification) throw new NotFoundException(`Notification with id ${id} not found`)
    return notification;
  }
  
  //update a notification
  async update(id: number, updateNotificationDto: UpdateNotificationDto): Promise<Notification> {
    await this.findOne(id);
    await this.notificationRepository.update(id, updateNotificationDto);
    return await this.findOne(id);
  }
  //delete a notification
  async remove(id: number): Promise< { message: string }> {
    await this.findOne(id);
    await this.notificationRepository.delete(id);
    return { message: `Notification ${id} deleted successfully`};
  }
}
