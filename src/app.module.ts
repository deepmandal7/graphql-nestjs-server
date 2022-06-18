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
import { EmployeeBreaksModule } from './employee_breaks/employee_breaks.module';
import { ShiftsModule } from './shifts/shifts.module';
import { WorkDurationsModule } from './work_durations/work_durations.module';

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
    EmployeeBreaksModule,
    ShiftsModule,
    WorkDurationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
