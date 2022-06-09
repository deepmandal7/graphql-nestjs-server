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
import { TimeclockModule } from './timeclock/timeclock.module';
import { TaskBoardCustomisationModule } from './task_board_customisation/task_board_customisation.module';
import { TaskRepeatDetailsModule } from './task_repeat_details/task_repeat_details.module';

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
    TimeclockModule,
    TaskRepeatDetailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
