import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, default: 'string@domain.com' })
  email: string;

  @IsString()
  @ApiProperty({ required: true, default: 'full name' })
  name: string;

  @IsString()
  @ApiProperty({ required: true, default: 'enter password' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  phone: string;
}

export class UpdateUserDTO {
  @IsString()
  @ApiProperty({ required: true, default: 'string@domain.com' })
  email: string;

  @IsString()
  @ApiProperty({ required: true, default: 'full name' })
  name: string;

  @IsString()
  @ApiProperty({ required: false })
  phone: string;
}
