import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeBreaksResolver } from './employee_breaks.resolver';
import { EmployeeBreaksService } from './employee_breaks.service';

describe('EmployeeBreaksResolver', () => {
  let resolver: EmployeeBreaksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeBreaksResolver, EmployeeBreaksService],
    }).compile();

    resolver = module.get<EmployeeBreaksResolver>(EmployeeBreaksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
