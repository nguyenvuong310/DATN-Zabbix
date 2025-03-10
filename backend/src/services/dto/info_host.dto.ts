import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class InfoHostDto {
  @ApiProperty({ example: '10084', description: 'Unique ID of the host' })
  @IsString()
  hostid: string;

  @ApiProperty({ example: 'Zabbix server', description: 'Name of the host' })
  @IsString()
  host: string;

  @ApiProperty({
    example: '0',
    description: 'Host status (0 = monitored, 1 = unmonitored)',
  })
  @IsString()
  status: string;

  @ApiProperty({ example: '1', description: 'TLS connection method' })
  @IsString()
  tls_connect: string;

  @ApiProperty({ example: '1', description: 'TLS acceptance method' })
  @IsString()
  tls_accept: string;

  @ApiProperty({ example: '', description: 'TLS issuer (if any)' })
  @IsOptional()
  @IsString()
  tls_issuer?: string;

  @ApiProperty({ example: '', description: 'TLS subject (if any)' })
  @IsOptional()
  @IsString()
  tls_subject?: string;

  @ApiProperty({ example: '0', description: 'Flag for custom interfaces' })
  @IsString()
  custom_interfaces: string;

  @ApiProperty({ example: '', description: 'Host UUID' })
  @IsOptional()
  @IsString()
  uuid?: string;

  @ApiProperty({
    example: '0',
    description: 'Flag for inventory mode (0 = disabled, 1 = automatic)',
  })
  @IsString()
  inventory_mode: string;

  @ApiProperty({
    example: '0',
    description: 'Indicates if active monitoring is available',
  })
  @IsString()
  active_available: string;

  @ApiProperty({ example: '0', description: 'Proxy ID assigned to the host' })
  @IsString()
  assigned_proxyid: string;

  constructor(
    hostid: string,
    host: string,
    status: string,
    tls_connect: string,
    tls_accept: string,
    custom_interfaces: string,
    inventory_mode: string,
    active_available: string,
    tls_issuer?: string,
    tls_subject?: string,
    uuid?: string,
    assigned_proxyid?: string,
  ) {
    this.hostid = hostid;
    this.host = host;
    this.status = status;
    this.tls_connect = tls_connect;
    this.tls_accept = tls_accept;
    this.custom_interfaces = custom_interfaces;
    this.inventory_mode = inventory_mode;
    this.active_available = active_available;
    this.tls_issuer = tls_issuer;
    this.tls_subject = tls_subject;
    this.uuid = uuid;
    this.assigned_proxyid = assigned_proxyid;
  }
}
