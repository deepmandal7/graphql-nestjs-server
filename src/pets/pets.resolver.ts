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
    return this.petsService.findOne({id})
  }

  @Query(() => [Pet])
  pets(@Args('take', {type:()=> Int}) take: number,
  @Args('cursor', {type:()=> Int}) cursor: number | null,): Promise<PetType[]> {
    return this.petsService.findAll(take, cursor);
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
      Owner: {
        connect: {
          id: createPetInput.ownerId,
        },
      },
    };
    return this.petsService.create(data);
  }
}
