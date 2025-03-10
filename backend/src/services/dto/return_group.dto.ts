import { ApiProperty } from '@nestjs/swagger';

export class ReturnGroupDto {
  @ApiProperty({ example: '19', description: 'ID của nhóm host' })
  groupid: string;

  @ApiProperty({ example: 'Applications', description: 'Tên của nhóm' })
  name: string;

  @ApiProperty({
    example: '0',
    description: 'Cờ xác định trạng thái đặc biệt của nhóm',
  })
  flags: string;

  @ApiProperty({
    example: 'a571c0d144b14fd4a87a9d9b2aa9fcd6',
    description: 'UUID của nhóm',
  })
  uuid: string;

  constructor(groupid: string, name: string, flags: string, uuid: string) {
    this.groupid = groupid;
    this.name = name;
    this.flags = flags;
    this.uuid = uuid;
  }
}
