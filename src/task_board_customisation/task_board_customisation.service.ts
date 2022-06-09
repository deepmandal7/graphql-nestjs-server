import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateTaskBoardCustomisationInput } from './dto/create-task_board_customisation.input';
import { UpdateTaskBoardCustomisationInput } from './dto/update-task_board_customisation.input';

@Injectable()
export class TaskBoardCustomisationService {
  constructor(private prisma: PrismaService) {}

  async findAll(taskBoardId: number) {
    return await this.prisma.task_board_customisation.findMany({
      where: {
        task_board_id: taskBoardId,
      },
    });
  }

  async updateMany(updateTaskBoardCustomisationInput) {
    let updateData = JSON.parse(
      JSON.stringify(updateTaskBoardCustomisationInput),
    );
    return await Promise.all(
      updateData[0].task_board_customisation_list.map((item) => {
        return this.prisma.task_board_customisation.update({
          where: {
            id: item.id,
          },
          data: item,
        });
      }),
    );
  }

  async customisationValidate(validator, input) {
    let fieldNames = Object.keys(input);

    validator.forEach((customisation) => {
      if (
        (!customisation.visibility &&
          fieldNames.includes(customisation.field_name)) ||
        (customisation.mandatory &&
          !customisation.visibility &&
          fieldNames.includes(customisation.field_name))
      ) {
        throw new BadRequestException({
          message: `${customisation.field_name} is not visible`,
          error: 'Bad Request',
        });
      }

      if (
        customisation.mandatory &&
        customisation.visibility &&
        !fieldNames.includes(customisation.field_name)
      ) {
        throw new BadRequestException({
          message: `${customisation.field_name} is mandatory`,
          error: 'Bad Request',
        });
      }
      return;
    });
  }

  remove(id: number) {
    return `This action removes a #${id} taskBoardCustomisation`;
  }
}
