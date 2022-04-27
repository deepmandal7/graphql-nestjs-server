import { Injectable } from '@nestjs/common';
import { Prisma, Owner } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
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
      include: {
        pets: true
      }
    })
  }

  findOne(ownerWhereUniqueInput: Prisma.OwnerWhereUniqueInput,
    ): Promise<Owner | null> {
    return this.prisma.owner.findUnique({
      where: ownerWhereUniqueInput,
      include: {
        pets: true
      }
    })
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
