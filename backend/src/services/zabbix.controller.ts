import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ZabbixService } from '../services/zabbix.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorator/public.decorator';
import { User } from 'src/decorator/user.decorator';
import { CreateHostDto } from './dto/host.dto';
import { ResponseMessage } from 'src/decorator/reposone_message.decorator';
import axios from 'axios';

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
    const response = await axios.post(
      'http://localhost:8080/api_jsonrpc.php',
      {
        jsonrpc: '2.0',
        method: 'item.create',
        params: [
          {
            name: 'Incoming Bandwidth (bps)',
            key_: 'snmp.in.traffic',
            hostid: '10555',
            type: 19, // SNMPv2/v3
            value_type: 3, // Numeric (float)
            interfaceid: '0',
            url: 'http://192.168.1.100/api/status',
            delay: '30s',
          },
          {
            name: 'Outgoing Bandwidth (bps)',
            key_: 'snmp.out.traffic',
            hostid: '10555',
            type: 19,
            value_type: 3,
            url: 'http://192.168.1.100/api/status',
            interfaceid: '0',
            delay: '30s',
          },
        ],
        id: 5,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(response);
    return response.data.result;
  }

  @Get('interfaces')
  async getInterfaces(@User() token) {
    const response = await axios.post(
      'http://localhost:8080/api_jsonrpc.php',
      {
        jsonrpc: '2.0',
        method: 'hostinterface.get',
        params: {
          output: 'extend',
        },
        id: 6,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data.result;
  }
}
