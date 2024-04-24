import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, isNumber, isString } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, default: 'title' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, default: '<user-id>' })
  user: string;
}
