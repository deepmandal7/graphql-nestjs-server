import { Injectable } from '@nestjs/common';
import { Prisma, Owner, Pet } from '@prisma/client';
import { OwnersService } from '../owners/owners.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PetsService {
  constructor(
    private prisma: PrismaService,
    private ownersService: OwnersService,
  ) {}

  findOne(petWhereUniqueInput: Prisma.PetWhereUniqueInput,): Promise<any> | null {
    return this.prisma.pet.findUnique({
      where: petWhereUniqueInput,
      include: {
        Owner: true
      },
    })
  }

  findAll(take: number, cursor: number | null): Promise<Pet[]> {
    if (cursor) {
      return this.prisma.pet.findMany({
        include: {
          Owner: true
        },
        orderBy: {
          id: 'asc',
        },
        take: take,
        skip: 1, 
        cursor: {
          id: cursor,
        },
      });
    }
    return this.prisma.pet.findMany({
      include: {
        Owner: true
      },
      orderBy: {
        id: 'asc',
      },
      take: take,
    });
  }

  getOwner(ownerId: any): Promise<Owner> {
    return this.ownersService.findOne(ownerId);
  }

  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    return await this.prisma.pet.create({ data });
  }
}
