import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersResolver } from './owners.resolver';
import { Owner } from './entities/owner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from 'src/pets/entities/pet.entity';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService,OwnersResolver, OwnersService],
  exports: [OwnersService]
})
export class OwnersModule {}
