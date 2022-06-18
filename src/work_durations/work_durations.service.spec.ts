import { Test, TestingModule } from '@nestjs/testing';
import { WorkDurationsService } from './work_durations.service';

describe('WorkDurationsService', () => {
  let service: WorkDurationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkDurationsService],
    }).compile();

    service = module.get<WorkDurationsService>(WorkDurationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
