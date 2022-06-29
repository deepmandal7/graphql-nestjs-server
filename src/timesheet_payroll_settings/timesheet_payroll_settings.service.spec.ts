import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetPayrollSettingsService } from './timesheet_payroll_settings.service';

describe('TimesheetPayrollSettingsService', () => {
  let service: TimesheetPayrollSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetPayrollSettingsService],
    }).compile();

    service = module.get<TimesheetPayrollSettingsService>(TimesheetPayrollSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
