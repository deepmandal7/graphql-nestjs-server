import { Test, TestingModule } from '@nestjs/testing';
import { RepeatDetailsService } from './repeat_details.service';

describe('RepeatDetailsService', () => {
  let service: RepeatDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepeatDetailsService],
    }).compile();

    service = module.get<RepeatDetailsService>(RepeatDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
