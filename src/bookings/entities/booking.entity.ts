import{Entity,PrimaryGeneratedColumn,Column, CreateDateColumn} from'typeorm';

@Entity('bookings')
export class booking{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({length:255})
    name: string;

    @Column({length: 255})
    email: string;

    @Column({length: 225})
    hostelNumber: number;

    @Column({length: 225})
    bookingFee: number;

    @CreateDateColumn()
    createAt: Date;
}






