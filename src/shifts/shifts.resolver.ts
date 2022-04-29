import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ShiftsService } from './shifts.service';
import { CreateShiftInput } from './dto/create-shift.input';
import { UpdateShiftInput } from './dto/update-shift.input';

@Resolver('Shift')
export class ShiftsResolver {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Mutation('createShift')
  create(@Args('createShiftInput') createShiftInput: CreateShiftInput) {
    return this.shiftsService.create(createShiftInput);
  }

  @Query('shifts')
  findAll() {
    return this.shiftsService.findAll();
  }

  @Query('shift')
  findOne(@Args('id') id: number) {
    return this.shiftsService.findOne(id);
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
