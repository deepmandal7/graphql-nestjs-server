import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { JobsModule } from './jobs/jobs.module';
import { SubJobsModule } from './sub-jobs/sub-jobs.module';
import { ShiftsModule } from './shifts/shifts.module';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    typePaths: ['./**/*.graphql'],
    definitions: {
      path: join(process.cwd(), 'src/graphql.ts'),
      outputAs: 'class',
    },
    }),
    JobsModule,
    ShiftsModule,
    SubJobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
