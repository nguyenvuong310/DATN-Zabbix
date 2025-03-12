import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class SNMPDetailsDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 2 })
  version: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 0 })
  bulk: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '{$SNMP_COMMUNITY}' })
  community: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '' })
  securityname?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '' })
  contextname?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 0 })
  securitylevel: number;
}

class InterfaceDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 2, description: 'SNMP device' })
  type: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  main: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  useip: number;

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

  @ValidateNested()
  @Type(() => SNMPDetailsDto)
  details: SNMPDetailsDto;
}

class HostGroupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '4', description: 'ID of groups contain cameras' })
  groupid: string;
}

class HostTemplateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '10226', description: 'ID of template' })
  templateid: string;
}

export class CreateHostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Camera 1', description: 'Name of camera' })
  host: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InterfaceDto)
  interfaces: InterfaceDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HostGroupDto)
  groups: HostGroupDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HostTemplateDto)
  templates: HostTemplateDto[];
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
