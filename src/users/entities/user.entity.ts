import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Notification } from 'src/notification/entities/notification.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255, unique: true })
  email!: string;

  @Column({ length: 100 })
  firstName!: string;

  @Column({ length: 100, nullable: true })
  lastName?: string;

  @Column({ length: 20, nullable: true })
  phoneNumber?: string;

  @OneToMany(() => Notification, (notification) => notification.student)
  notifications!: Notification[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

