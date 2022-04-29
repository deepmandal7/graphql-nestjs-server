import { Test, TestingModule } from '@nestjs/testing';
import { SubJobsService } from './sub-jobs.service';

describe('SubJobsService', () => {
  let service: SubJobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubJobsService],
    }).compile();

    service = module.get<SubJobsService>(SubJobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
