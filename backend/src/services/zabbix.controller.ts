import { Controller, Get, Post } from '@nestjs/common';
import { ZabbixService } from '../services/zabbix.service';

@Controller('zabbix')
export class ZabbixController {
  constructor(private readonly zabbixService: ZabbixService) {}

  @Post('login')
  async login() {
    return this.zabbixService.login();
  }

  @Get('hosts')
  async getHosts() {
    return this.zabbixService.getHosts();
  }
}
