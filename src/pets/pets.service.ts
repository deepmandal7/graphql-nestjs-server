import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/createPet.dto';
import { Pet } from './entities/pet.entity';
import { OwnersService } from '../owners/owners.service';
import { Owner } from 'src/owners/entities/owner.entity';

@Injectable()
export class PetsService {
    constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>, private ownersService: OwnersService) {}

    findOne(id: any): Promise<Pet> {
        return this.petsRepository.findOneOrFail(id)
    }

    findAll(): Promise<Pet[]> {
        return this.petsRepository.find()
    }

    getOwner(ownerId: any): Promise<Owner> {
        return this.ownersService.findOne(ownerId)
    }

    create(createPetInput: CreatePetInput): Promise<Pet> {
        const newPet =  this.petsRepository.create(createPetInput)

        return this.petsRepository.save(newPet)
    }
}
