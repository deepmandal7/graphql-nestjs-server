import { Test, TestingModule } from '@nestjs/testing';
import { TimeOffsResolver } from './time_offs.resolver';
import { TimeOffsService } from './time_offs.service';

describe('TimeOffsResolver', () => {
  let resolver: TimeOffsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeOffsResolver, TimeOffsService],
    }).compile();

    resolver = module.get<TimeOffsResolver>(TimeOffsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
