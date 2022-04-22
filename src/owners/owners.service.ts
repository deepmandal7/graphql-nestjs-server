import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prisma, Owner } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';

@Injectable()
export class OwnersService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.OwnerCreateInput): Promise<Owner> {
    return this.prisma.owner.create({ data })
     
  }

  findAll(skip, take): Promise<Owner[]> {
    return this.prisma.owner.findMany({
      skip,
      take,
    })
  }

  findOne(ownerWhereUniqueInput: Prisma.OwnerWhereUniqueInput,
    ): Promise<Owner | null> {
    return this.prisma.owner.findUnique({
      where: ownerWhereUniqueInput
    })
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
