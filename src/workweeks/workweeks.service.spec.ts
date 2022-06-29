import { Test, TestingModule } from '@nestjs/testing';
import { WorkweeksService } from './workweeks.service';

describe('WorkweeksService', () => {
  let service: WorkweeksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkweeksService],
    }).compile();

    service = module.get<WorkweeksService>(WorkweeksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
