import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TaskBoardModule } from './task_board/task_board.module';
import { TaskModule } from './task/task.module';
import { TaskCommentsModule } from './task_comments/task_comments.module';
import { SubTaskModule } from './sub_task/sub_task.module';
import { TaskBoardCustomisationModule } from './task_board_customisation/task_board_customisation.module';
import { TaskRepeatDetailsModule } from './task_repeat_details/task_repeat_details.module';
import { TimesheetsModule } from './timesheets/timesheets.module';
import { TimeEntryModule } from './time_entry/time_entry.module';
import { ShiftsModule } from './shifts/shifts.module';
import { WorkDurationsModule } from './work_durations/work_durations.module';
import { TimesheetsGeneralSettingsModule } from './timesheets_general_settings/timesheets_general_settings.module';
import { TimesheetCustomizationSettingsModule } from './timesheet_customization_settings/timesheet_customization_settings.module';
import { TimesheetPayrollSettingsModule } from './timesheet_payroll_settings/timesheet_payroll_settings.module';
import { TimesheetJobSettingsModule } from './timesheet_job_settings/timesheet_job_settings.module';
import { TimesheetSubJobSettingsModule } from './timesheet_sub_job_settings/timesheet_sub_job_settings.module';
import { TimesheetNotificationSettingsModule } from './timesheet_notification_settings/timesheet_notification_settings.module';
import { TimesheetGeoLocationSettingsModule } from './timesheet_geo_location_settings/timesheet_geo_location_settings.module';
import { TimesheetReminderSettingsModule } from './timesheet_reminder_settings/timesheet_reminder_settings.module';
import { WorkweeksModule } from './workweeks/workweeks.module';
import { TimesheetGeoLocationsModule } from './timesheet_geo_locations/timesheet_geo_locations.module';
import { TimesheetEntryModule } from './timesheet_entry/timesheet_entry.module';
import { EmployeeBreaksModule } from './employee_breaks/employee_breaks.module';
import { TimeOffTypeModule } from './time_off_type/time_off_type.module';
import { TimeOffsModule } from './time_offs/time_offs.module';
import { AttendanceModule } from './attendance/attendance.module';
import { TimeEntryPendingModule } from './time_entry_pending/time_entry_pending.module';
import { EmployeeBreakPendingModule } from './employee_break_pending/employee_break_pending.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),
    TaskBoardModule,
    TaskBoardCustomisationModule,
    TaskModule,
    TaskCommentsModule,
    SubTaskModule,
    TaskRepeatDetailsModule,
    TimesheetsModule,
    TimeEntryModule,
    ShiftsModule,
    WorkDurationsModule,
    TimesheetsGeneralSettingsModule,
    TimesheetCustomizationSettingsModule,
    TimesheetPayrollSettingsModule,
    TimesheetJobSettingsModule,
    TimesheetSubJobSettingsModule,
    TimesheetNotificationSettingsModule,
    TimesheetGeoLocationSettingsModule,
    TimesheetReminderSettingsModule,
    WorkweeksModule,
    TimesheetGeoLocationsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      include: [TimesheetGeoLocationsModule],
      path: '/timesheetGeoLocations',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      include: [TimesheetJobSettingsModule],
      path: '/timesheetJobSettings',
    }),
    TimesheetEntryModule,
    EmployeeBreaksModule,
    TimeOffTypeModule,
    TimeOffsModule,
    AttendanceModule,
    TimeEntryPendingModule,
    EmployeeBreakPendingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
