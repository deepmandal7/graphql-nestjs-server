import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AttendanceService } from './attendance.service';
import { QueryAttendanceInput } from './dto/query-attendance.input';

@Resolver('Attendance')
export class AttendanceResolver {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Query('getAllAttendance')
  async findAll(
    @Args('take') take: number,
    @Args('cursor') cursor: number,
    @Args('where') queryAttendanceInput: QueryAttendanceInput,
    @Args('orgId') orgId: number,
    @Args('searchText') searchText: string,
  ) {
    return await this.attendanceService.findAll(
      take,
      cursor ? { id: cursor } : null,
      queryAttendanceInput,
      orgId,
      searchText,
    );
  }
}
