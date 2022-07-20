import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeBreakPendingResolver } from './employee_break_pending.resolver';
import { EmployeeBreakPendingService } from './employee_break_pending.service';

describe('EmployeeBreakPendingResolver', () => {
  let resolver: EmployeeBreakPendingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeBreakPendingResolver, EmployeeBreakPendingService],
    }).compile();

    resolver = module.get<EmployeeBreakPendingResolver>(EmployeeBreakPendingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
