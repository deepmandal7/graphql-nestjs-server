import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ShiftsService } from './shifts.service';
import { CreateShiftInput } from './dto/create-shift.input';
import { UpdateShiftInput } from './dto/update-shift.input';

@Resolver('Shift')
export class ShiftsResolver {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Mutation('createShift')
  async create(@Args('createShiftInput') createShiftInput: CreateShiftInput[]) {
    return await this.shiftsService.create(createShiftInput);
  }

  @Mutation('updateShift')
  update(@Args('updateShiftInput') updateShiftInput: UpdateShiftInput) {
    return this.shiftsService.update(updateShiftInput.id, updateShiftInput);
  }

  @Mutation('removeShift')
  remove(@Args('id') id: number) {
    return this.shiftsService.remove(id);
  }
}
