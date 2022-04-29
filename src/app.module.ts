import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { OwnersModule } from './owners/owners.module';
import { JobsModule } from './jobs/jobs.module';
import { SubJobsModule } from './sub-jobs/sub-jobs.module';
import { ShiftsModule } from './shifts/shifts.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    typePaths: ['./**/*.graphql'],
    definitions: {
      path: join(process.cwd(), 'src/graphql.ts'),
      outputAs: 'class',
    },
    }),
    PetsModule,
    OwnersModule,
    JobsModule,
    ShiftsModule,
    SubJobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
