import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  Res,
  HttpStatus,
  HttpException,
  InternalServerErrorException,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Prisma } from "@prisma/client";
import { ApiTags, ApiBody } from "@nestjs/swagger";
import { CreateTaskDTO } from "./tasks.dto";
import { FastifyReply } from "fastify";
import { HttpExceptionFilter } from "src/http-exception.filter";

@ApiTags("Tasks")
@Controller("api/task")
@UseFilters(HttpExceptionFilter)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiBody({ type: CreateTaskDTO })
  async create(@Body() createTaskDto: Prisma.TaskCreateInput) {
    try {
      const user = await this.tasksService.create(createTaskDto);
      return user;
    } catch (error) {
      console.log(JSON.stringify(error));
      // throw new InternalServerErrorException(error.name);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  findAll() {
    try {
      return this.tasksService.findAll();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    try {
      return this.tasksService.findOne(+id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(":id")
  @ApiBody({ type: CreateTaskDTO })
  update(
    @Param("id") id: string,
    @Body() updateTaskDto: Prisma.TaskUpdateInput
  ) {
    try {
      return this.tasksService.update(+id, updateTaskDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    try {
      return this.tasksService.remove(+id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
