import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OwnersModule } from '../owners/owners.module';
import { PetsResolver } from './pets.resolver';
import { PetsService } from './pets.service';

@Module({
  imports: [ OwnersModule],
  providers: [PrismaService, PetsResolver, PetsService]
})
export class PetsModule {}
