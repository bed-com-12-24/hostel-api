import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type UserRole = 'student' | 'admin' | 'warden';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({
        type: 'enum',
        enum: ['student', 'admin', 'warden'],
        default: 'student'
    })
    role!: UserRole;

    @Column({ nullable: true })
    studentId?: string;

    @CreateDateColumn()
    createdAt!: Date;
}
