import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(req: Request, res: Response, @Param('id') id: string) {
    const deleteUser = await this.userService.remove(+id);
    return deleteUser;
  }
}
