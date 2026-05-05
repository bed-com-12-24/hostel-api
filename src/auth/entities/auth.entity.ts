import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('auth')
export class Auth {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255, unique: true })
  email!: string;

  @Column({ length: 255 })
  password!: string;

  @Column({ length: 100 })
  firstName!: string;

  @Column({ length: 100, nullable: true })
  lastName?: string;

  @Column({ length: 20, nullable: true })
  phoneNumber?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

