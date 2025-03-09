import { Body, Controller, Get, Post } from '@nestjs/common';
import { ZabbixService } from '../services/zabbix.service';
import { UserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../decorator/public.decorator';
import { User } from 'src/decorator/user.decorator';

@Controller('cameras')
@ApiTags('Cameras')
export class ZabbixController {
  constructor(private readonly zabbixService: ZabbixService) {}

  @Post('login')
  @Public()
  async login(@Body() user: UserDto) {
    return this.zabbixService.login(user.username, user.password);
  }

  @Get('')
  async getHosts(@User() token) {
    return this.zabbixService.getHosts(token);
  }

  @Post('')
  async createHost(@User() token) {
    return this.zabbixService.createHost(token);
  }
}
