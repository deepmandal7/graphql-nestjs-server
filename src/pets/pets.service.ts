import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/createPet.dto';
import { Pet } from './pet.entity';

@Injectable()
export class PetsService {
    constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

    async findOne(id: any): Promise<Pet> {
        return this.petsRepository.findOneOrFail(id)
    }

    async findAll(): Promise<Pet[]> {
        return this.petsRepository.find()
    }

    async create(createPetInput: CreatePetInput): Promise<Pet> {
        const newPet =  this.petsRepository.create(createPetInput)

        return this.petsRepository.save(newPet)
    }
}
