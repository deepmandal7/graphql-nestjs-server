import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RepeatDetailsService {
    constructor(private prisma: PrismaService) {}

    create(data: Prisma.repeat_detailsCreateInput) {
        if (data) {
          return this.prisma.repeat_details.create({data})
        }
    }
}
