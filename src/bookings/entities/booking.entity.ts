import{Entity,PrimaryGeneratedColumn,Column, CreateDateColumn} from'typeorm';

@Entity('bookings')
export class booking{

    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({length:255})
    name!: string;

    @Column({length: 255})
    email!: string;

    @Column({})
    hostelNumber!: number;

    @Column({})
    bookingFee!: number;

    @CreateDateColumn()
    createAt!: Date;
}






