import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetPayrollSettingsResolver } from './timesheet_payroll_settings.resolver';
import { TimesheetPayrollSettingsService } from './timesheet_payroll_settings.service';

describe('TimesheetPayrollSettingsResolver', () => {
  let resolver: TimesheetPayrollSettingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetPayrollSettingsResolver, TimesheetPayrollSettingsService],
    }).compile();

    resolver = module.get<TimesheetPayrollSettingsResolver>(TimesheetPayrollSettingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
