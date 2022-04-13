import { Mutation, Query, Resolver, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { Owner } from '../owners/entities/owner.entity';
import { CreatePetInput } from './dto/createPet.dto';
import { Pet } from './entities/pet.entity';
import { PetsService } from './pets.service';

@Resolver(of => Pet)
export class PetsResolver {
    constructor (private petsService: PetsService) {}

    @Query(returns => Pet)
    getPet(@Args('id', {type: () => Int}) id: number) {
        return this.petsService.findOne({where: {id}})
    }

    @Query(returns => [Pet])
    pets(): Promise<Pet[]> {
        return this.petsService.findAll()
    }


    @ResolveField(returns => Owner)
    owner(@Parent() pet: Pet) {
        return this.petsService.getOwner(pet.ownerId) 
    }

    @Mutation(() => Pet)
    createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet> {
        return this.petsService.create(createPetInput)
    }
}
