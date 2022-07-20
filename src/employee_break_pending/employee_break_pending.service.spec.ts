import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeBreakPendingService } from './employee_break_pending.service';

describe('EmployeeBreakPendingService', () => {
  let service: EmployeeBreakPendingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeBreakPendingService],
    }).compile();

    service = module.get<EmployeeBreakPendingService>(EmployeeBreakPendingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
