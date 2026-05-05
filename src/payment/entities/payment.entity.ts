import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('payment')
export class payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  payment_method!: string;

  @Column()
  amount_payed!: number;

  @Column()
  booking_id!: number;

  @Column()
  student_id!: string;

  @CreateDateColumn()
  date_payed!: Date;
}
