import { Test, TestingModule } from '@nestjs/testing';
<<<<<<<< HEAD:src/payment/payment.service.spec.ts
import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
========
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
>>>>>>>> origin/users:src/users/users.service.spec.ts
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
