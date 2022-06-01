import { Test, TestingModule } from '@nestjs/testing';
import { TimeclockService } from './timeclock.service';

describe('TimeclockService', () => {
  let service: TimeclockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeclockService],
    }).compile();

    service = module.get<TimeclockService>(TimeclockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
