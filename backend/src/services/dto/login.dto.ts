import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
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

export class ReturnLoginDto {
  @ApiProperty({
    description: 'The token of the user',
    example: 'a1f4774a1bb6acac6b6c09b7f29846ed',
  })
  accessToken: string;

  constructor(auth: string) {
    this.accessToken = auth;
  }
}
