import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  BANK_TRANSFER = 'bank_transfer',
  MOBILE_MONEY = 'mobile_money',
  CASH = 'cash',
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 20,
    default: PaymentMethod.CREDIT_CARD,
  })
  paymentMethod!: PaymentMethod;

  @Column('decimal', { precision: 10, scale: 2 })
  amountPaid!: number;

  @Column({
    type: 'varchar',
    length: 20,
    default: PaymentStatus.PENDING,
  })
  status!: PaymentStatus;

  @Column()
  bookingId!: number;

  @Column()
  studentId!: number;

  @Column({ nullable: true, length: 255 })
  transactionId?: string;

  @Column({ nullable: true, type: 'clob' })
  description?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ nullable: true })
  paymentDate?: Date;
}
