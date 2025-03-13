import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class HostGroupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '4', description: 'ID of groups contain cameras' })
  groupid: string;
}

export class CreateHostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Camera 1', description: 'Name of camera' })
  host: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '192.168.1.100' })
  ip: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '' })
  dns: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '161', description: 'SNMP port' })
  port: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HostGroupDto)
  groups: HostGroupDto[];
}

export class ReturnHostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '10655', description: 'ID of created host' })
  hostid: string;

  constructor(hostid: string) {
    this.hostid = hostid;
  }
}
