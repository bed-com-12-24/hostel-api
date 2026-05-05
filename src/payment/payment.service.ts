import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(payment)
    private paymentRepository: Repository<payment>,
  ){}
  //create a payment
  async create(createPaymentDto: CreatePaymentDto): Promise<payment> {
    const payment = this.paymentRepository.create(createPaymentDto);
    return await this.paymentRepository.save(payment);
  }
  //read all
  async findAll(): Promise<payment[]> {
    return await this.paymentRepository.find();
  }

    //read one
  async findOne(id: number): Promise<payment> {
    const payment = await this.paymentRepository.findOne({where:{ id }});
    if(!payment) throw new NotFoundException(`Payment with id ${id} not found`)
    return payment;
  }

  //update payment
  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<payment> {
    await this.findOne(id);
    await this.paymentRepository.update(id, updatePaymentDto);
    return await this.findOne(id);
  }

    //delete a payment
  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.paymentRepository.delete(id);
    return { message: `Payment ${id} deleted successfully`};
  }
}
