import { Mutation, Query, Resolver, Args, Int } from '@nestjs/graphql';
import { CreatePetInput } from './dto/createPet.dto';
import { Pet } from './pet.entity';
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

    @Mutation(() => Pet)
    createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet> {
        return this.petsService.create(createPetInput)
    }
}
