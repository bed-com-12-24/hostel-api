import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Notification } from 'src/notification/entities/notification.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

 @Column({ length: 200 })
  name!: string;

  @Column({ length: 255, unique: true })
  email!: string;

  @Column({ length: 255 })
  password!: string;

<<<<<<< HEAD
=======
  @Column({ length: 20, nullable: true })
  phoneNumber?: string;

  @OneToMany(() => Notification, (notification) => notification.student)
  notifications!: Notification[];
>>>>>>> cfa9fd558427141a34946465f66fc82820ff6cc4
  @Column({ length: 50, default: 'student' })
  role!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

