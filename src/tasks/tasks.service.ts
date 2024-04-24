import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTaskDto: Prisma.TaskCreateInput) {
    const userId = Number(createTaskDto.user);
    const findUser = await this.databaseService.user.findFirst({
      where: { id: userId },
    });
    if (!findUser)
      throw new NotFoundException(`User with ${userId} does not exist.`);
    return this.databaseService.task.create({
      data: {
        title: createTaskDto.title,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  findAll() {
    return this.databaseService.task.findMany({
      include: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    const task = await this.databaseService.task.findFirst({
      where: { id },
      include: { user: true },
    });
    if (!task) throw new NotFoundException(`Task with ${id} does not exist.`);
    return task;
  }

  update(id: number, updateTaskDto: Prisma.TaskUpdateInput) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
