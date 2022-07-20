import { Test, TestingModule } from '@nestjs/testing';
import { TimeOffTypeService } from './time_off_type.service';

describe('TimeOffTypeService', () => {
  let service: TimeOffTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeOffTypeService],
    }).compile();

    service = module.get<TimeOffTypeService>(TimeOffTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
