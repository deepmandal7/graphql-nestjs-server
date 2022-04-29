import { Module } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { ShiftsResolver } from './shifts.resolver';

@Module({
  providers: [ShiftsResolver, ShiftsService]
})
export class ShiftsModule {}
