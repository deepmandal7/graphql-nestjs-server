import { Injectable } from '@nestjs/common';
import { Prisma, Owner, Pet } from '@prisma/client';
import { OwnersService } from '../owners/owners.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PetsService {
    constructor(private prisma: PrismaService, private ownersService: OwnersService) {}

    findOne(id: any): Promise<Pet> {
        return this.prisma.pet.findUnique(id)
    }

    findAll(): Promise<Pet[]> {
        return this.prisma.pet.findMany()
    }

    getOwner(ownerId: any): Promise<Owner> {
        return this.ownersService.findOne(ownerId)
    }

    async create(data: Prisma.PetCreateInput): Promise<Pet> {
        console.log("Data:", data)
        return await this.prisma.pet.create({ data })
    }
}
