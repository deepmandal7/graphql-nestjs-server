import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { task, Prisma } from '@prisma/client';
import { UpdateTaskInput } from './dto/update-task.input';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.taskCreateInput) :Promise<task> {
    return await this.prisma.task.create({data})
  }

  async findAll(take: number, cursor: Prisma.taskWhereUniqueInput | null, orgId: number, isUnassigned: boolean, userIds: number[], dates: string, startDate: string,  fromStartYear: number, fromStartMonth: number, fromStartDate: number, toStartYear: number, toStartMonth: number, toStartDate: number, tagId: number[], createdBy: number, taskStatus: String) {
    let filter: any = {
      where: {},
      // orderBy: {
      //   created_at: 'asc',
      // },
      take,
    }
    let timezone: any
    let orgLocalTime: any
    let orgYear: number 
    let orgMonth: number 
    let orgDate: number 
    let orgHours : number 
    let orgMinutes : number 
    console.log(JSON.stringify(filter,null,4))
    if (isUnassigned || userIds) {
      filter.where.OR = []
      if (isUnassigned) {
        filter.where.OR.push({
          user_ids: {
            equals: null
          }
        })
      }
      if (userIds) {
        filter.where.OR.push(
          {
              user_ids: {
                hasSome: userIds
              }
          },
        )
      }
    }
    
    console.log(JSON.stringify(filter,null,4))
    
    if (dates || startDate) {
      timezone = await this.prisma.organization.findUnique({
        select: {
          timezone: true
        },
        where: {
          id: orgId
        }
      })
      orgLocalTime = new Date(new Date().toLocaleString('en-US', { timeZone: timezone.timezone }))
      orgYear = orgLocalTime.getFullYear()
      orgMonth = orgLocalTime.getMonth()
      orgDate = orgLocalTime.getDate()
      orgHours = orgLocalTime.getHours()
      orgMinutes = orgLocalTime.getMinutes()
      if (dates) {
        switch (dates) {
          case "overdue":
            filter.where.task_end_date_time = {
              lt: orgLocalTime
            }
            break;
          case "today":
            filter.where.task_end_date_time = {
              startsWith: `${orgYear}-${String(orgMonth).padStart(2, '0')}-${String(orgDate).padStart(2, '0')}`
            }
            break;
          case "tomorrow":
            orgLocalTime.setDate(orgLocalTime.getDate() + 1)
            let orgTomYear = orgLocalTime.getFullYear()
            let orgTomMonth = orgLocalTime.getMonth()
            let orgTomDate = orgLocalTime.getDate()
            filter.where.task_end_date_time = {
              startsWith: `${orgTomYear}-${String(orgTomMonth).padStart(2, '0')}-${String(orgTomDate).padStart(2, '0')}`
            }
            break;
          case "nodue":
            filter.where.task_end_date_time = {
              equals: null
            }
            break
          case "next":
            filter.where.task_end_date_time = {
              gte: `${fromStartYear}-${String(fromStartMonth).padStart(2, '0')}-${String(fromStartDate).padStart(2, '0')}`,
              lte: `${toStartYear}-${String(toStartMonth).padStart(2, '0')}-${String(toStartDate).padStart(2, '0')}`,
            }
            break;
        }
        if (startDate) {
          switch (startDate) {
            case "started":
              filter.where.task_start_date_time = {
                lt: orgLocalTime
              }
              break;
            case "today":
              filter.where.task_start_date_time = {
                startsWith: `${orgYear}-${String(orgMonth).padStart(2, '0')}-${String(orgDate).padStart(2, '0')}`
              }
              break;
            case "tomorrow":
              orgLocalTime.setDate(orgLocalTime.getDate() + 1)
              let orgTomYear = orgLocalTime.getFullYear()
              let orgTomMonth = orgLocalTime.getMonth()
              let orgTomDate = orgLocalTime.getDate()
              filter.where.task_start_date_time = {
                startsWith: `${orgTomYear}-${String(orgTomMonth).padStart(2, '0')}-${String(orgTomDate).padStart(2, '0')}`
              }
              break;
            case "nodate":
              filter.where.task_start_date_time = {
                equals: null
              }
              break
            case "next":
              filter.where.task_end_date_time = {
                gte: `${fromStartYear}-${String(fromStartMonth).padStart(2, '0')}-${String(fromStartDate).padStart(2, '0')}`,
                lte: `${toStartYear}-${String(toStartMonth).padStart(2, '0')}-${String(toStartDate).padStart(2, '0')}`,
              }
              break;
          }
        }
      }
    }
    if (taskStatus) {
      filter.where.task_status = {
        equals: taskStatus
      }
    }
    if (tagId) {
      filter.where.task_tag = {
        every: {
          tag_id: {
            in: tagId
          }
        }
      }
    }
    if (createdBy) {
      filter.where.created_by = {
        equals: createdBy
      }
    }
    if (cursor) {
      filter.cursor = cursor
      filter.skip = 1
    }
    console.log(JSON.stringify(filter,null,4))
    let data = await this.prisma.task.findMany(filter);
    // console.log(data)
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskInput: UpdateTaskInput) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
