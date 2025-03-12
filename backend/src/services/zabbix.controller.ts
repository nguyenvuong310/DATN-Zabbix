import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ZabbixService } from '../services/zabbix.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorator/public.decorator';
import { User } from 'src/decorator/user.decorator';
import { CreateHostDto } from './dto/host.dto';
import { ResponseMessage } from 'src/decorator/reposone_message.decorator';

@Controller('cameras')
@ApiTags('Cameras')
export class ZabbixController {
  constructor(private readonly zabbixService: ZabbixService) {}

  @Post('login')
  @Public()
  @ResponseMessage('Login success')
  async login(@Body() user: LoginDto) {
    return this.zabbixService.login(user.username, user.password);
  }

  @Get('')
  @ApiQuery({
    name: 'filter',
    required: false,
    description: 'Comma-separated list of device names',
    type: String,
  })
  @ApiOperation({ summary: 'Get all cameras or filter' })
  async getHosts(@User() token, @Query('filter') filter: string) {
    const names = filter ? filter.split(',') : [];
    return this.zabbixService.getHosts(token, names);
  }

  @Post('')
  @ApiOperation({ summary: 'Create a camera SNMP' })
  async createHost(@User() token, @Body() data: CreateHostDto) {
    return this.zabbixService.createHost(token, data);
  }

  @Get('groups')
  @ApiOperation({ summary: 'Get all groups' })
  async getGroups(@User() token) {
    return this.zabbixService.getHostGroups(token);
  }

  // create item to monitor incoming and outgoing traffic
  @Post('items')
  @ApiOperation({ summary: 'create items' })
  async createItems(@User() token) {
    return this.zabbixService.createItems(token);
  }

  // @Get('interfaces')
  // async getInterfaces(@User() token) {
  //   return this.zabbixService.getHostInterfaces(token);
  // }

  // @Get('items/:cameraId')
  // @ResponseMessage('Get items success')
  // async getItems(@User() token, @Param('cameraId') cameraId: string) {
  //   return this.zabbixService.getItems(token, cameraId);
  // }

  @Post('trigggers')
  async createTriggers(@User() token) {
    return this.zabbixService.createTrigger(token);
  }
}
