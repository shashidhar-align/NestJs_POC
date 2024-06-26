import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";
import { CreateUserDTO, UpdateUserDTO } from "./user.dto";
import * as bcrypt from "bcrypt";

export const roundsOfHashing = 10;
// TODO - Write raw queries using below variable

// const prisma = new PrismaClient({
//   log: [
//     {
//       emit: "event",
//       level: "query",
//     },
//   ],
// });

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing
    );

    createUserDto.password = hashedPassword;
    await this.databaseService.user.create({ data: createUserDto });
    const user = await this.databaseService.user.findFirst({
      where: { email: createUserDto.email }
    });
    delete user.password
    return user;
  }

  async findAll() {
    return await this.databaseService.user.findMany();
  }

  async findOne(id: number) {
    // let userTable = 'User'
    // let result = await prisma.$queryRawUnsafe(`SELECT * FROM ${userTable}`); // Raw query example
    const user = await this.databaseService.user.findFirst({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException(`User with ${id} does not exist.`);
    }
    delete user.password
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDTO) {
    return await this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        Task: true,
      },
    });
  }

  async remove(id: number) {
    return await this.databaseService.user.delete({
      where: { id },
    });
  }
}
