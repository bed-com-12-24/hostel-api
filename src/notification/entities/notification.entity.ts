import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Booking, (booking) => booking.notifications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'booking_id' })
  booking!: Booking;

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student!: User;

  @Column({ type: 'varchar', length: 4000 })
  message!: string;

  @CreateDateColumn()
  sentOn!: Date;
}

