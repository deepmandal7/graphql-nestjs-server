import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersResolver } from './owners.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService,OwnersResolver, OwnersService],
  exports: [OwnersService]
})
export class OwnersModule {}
