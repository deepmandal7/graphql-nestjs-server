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
    TaskModule,
    TaskCommentsModule,
    SubTaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
