import { Resolver, Query, Mutation, Args, Int, Parent } from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner } from '../graphql';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';

@Resolver(() => Owner)
export class OwnersResolver {
  constructor(private readonly ownersService: OwnersService) {}

  @Mutation(() => Owner)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
    return this.ownersService.create(createOwnerInput);
  }

  @Query(() => [Owner], { name: 'owners' })
  findAll(@Args('skip', {type:()=> Int}) skip: number, 
          @Args('take', {type:()=> Int}) take: number, ) {
    return this.ownersService.findAll(skip, take);
  }

  @Query(() => Owner, { name: 'owner' })
  findOne(@Args('id', { type: () => Int }) id: number,) {
    return this.ownersService.findOne({id});
  }

  

  @Mutation(() => Owner)
  updateOwner(@Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput) {
    return this.ownersService.update(updateOwnerInput.id, updateOwnerInput);
  }

  @Mutation(() => Owner)
  deleteOwner(@Args('id', { type: () => Int }) id: number) {
    return this.ownersService.remove(id);
  }
}
