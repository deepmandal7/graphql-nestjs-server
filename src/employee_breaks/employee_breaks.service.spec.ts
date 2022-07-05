import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeBreaksService } from './employee_breaks.service';

describe('EmployeeBreaksService', () => {
  let service: EmployeeBreaksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeBreaksService],
    }).compile();

    service = module.get<EmployeeBreaksService>(EmployeeBreaksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
