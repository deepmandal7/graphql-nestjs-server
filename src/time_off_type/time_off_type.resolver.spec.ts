import { Test, TestingModule } from '@nestjs/testing';
import { TimeOffTypeResolver } from './time_off_type.resolver';
import { TimeOffTypeService } from './time_off_type.service';

describe('TimeOffTypeResolver', () => {
  let resolver: TimeOffTypeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeOffTypeResolver, TimeOffTypeService],
    }).compile();

    resolver = module.get<TimeOffTypeResolver>(TimeOffTypeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
