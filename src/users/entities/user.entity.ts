export type UserRole = 'student' | 'admin' | 'warden';

export class User {
    id!: number;
    name!: string;
    email!: string;
    password!: string;
    role!: UserRole;
    studentId?: string;
    createdAt!: Date;
}
