import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message!: string;

  @Column()
  student_id!: string;

  @CreateDateColumn()
  sentOn!: Date;
}

