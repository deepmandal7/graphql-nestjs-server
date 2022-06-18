import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetsResolver } from './timesheets.resolver';
import { TimesheetsService } from './timesheets.service';

describe('TimesheetsResolver', () => {
  let resolver: TimesheetsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetsResolver, TimesheetsService],
    }).compile();

    resolver = module.get<TimesheetsResolver>(TimesheetsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
