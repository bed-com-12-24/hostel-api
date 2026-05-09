import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255, unique: true })
  email!: string;

  @Column({ length: 200 })
  name!: string;

  @Column({ length: 255 })
  password!: string;

  @Column({ length: 20, nullable: true })
  phoneNumber?: string;

  @Column({ length: 50, default: 'student' })
  role!: string;

  @Column({ length: 50, nullable: true })
  studentId?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

