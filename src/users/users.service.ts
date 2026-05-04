import { Injectable } from '@nestjs/common';
import { User, UserRole } from './entities/user.entity';


@Injectable()
export class UsersService {
  private users: User[] = []; // This will act as our in-memory database for users
  private nextId: number = 1; // To keep track of the next user ID


  //Called by AuthService when a new user registers
  async create(data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    studentId?: string;
  }) : Promise<User> {
    const exists = this.users.some(u => u.email === data.email);
    if (exists) {
      throw new Error('User with this email already exists');
    }

    const user:User = {
      id: this.nextId++,
      ...data,
      createdAt: new Date(),
    };

    this.users.push(user);
    return user;
  }

  //Called by AuthService when a user logs in, to find the user by email
  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(u => u.email === email);
  }

  async findById(id: number) : Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  async findAll() : Promise<User[]> {
    return this.users;
  }


  //Strip password before returning user data
  sanitize(user:User) : Omit<User, 'password'> {
    const{ password, ...safe} = user;
    return safe;
  }
}
