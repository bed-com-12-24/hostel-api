import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Notification } from 'src/notification/entities/notification.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Notification, (notification) => notification.booking)
  notifications!: Notification[];

  @Column({ length: 255 })
  email!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date!: Date;

  @Column()
  hostelNumber!: number;

  @Column()
  bookingFee!: number;

  @CreateDateColumn()
  createAt!: Date;
}






