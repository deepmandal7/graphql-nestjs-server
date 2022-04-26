import {
  Mutation,
  Query,
  Resolver,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Owner, Pet } from '../graphql';
import { Owner as OwnerType, Pet as PetType } from '@prisma/client';
import { CreatePetInput } from './dto/createPet.dto';
import { PetsService } from './pets.service';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  @Query(() => Pet, { name: 'pet' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.petsService.findOne({ where: { id } });
  }

  @Query(() => [Pet])
  pets(): Promise<PetType[]> {
    return this.petsService.findAll();
  }

  // @ResolveField(() => Owner)
  // owner(@Parent() pet: Pet) {
  //   return this.petsService.getOwner(pet.ownerId);
  // }

  @Mutation(() => Pet)
  createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<PetType> {
    let data = {
      name: createPetInput.name,
      owner: {
        connect: {
          id: createPetInput.ownerId,
        },
      },
    };
    return this.petsService.create(data);
  }
}
