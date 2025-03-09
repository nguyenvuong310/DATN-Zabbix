import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @ApiProperty({
    description: 'The username of the user',
    example: 'Admin',
  })
  username: string;

  @IsString()
  @ApiProperty({
    description: 'The password of the user',
    example: 'zabbix',
  })
  password: string;
}
