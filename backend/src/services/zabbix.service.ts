import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateHostDto, ReturnHostDto } from './dto/host.dto';
import { ReturnLoginDto } from './dto/login.dto';
import { InfoHostDto } from './dto/info_host.dto';
import { ReturnGroupDto } from './dto/return_group.dto';

@Injectable()
export class ZabbixService {
  private readonly apiUrl: string;
  private readonly jsonRpcVersion: string;

  constructor() {
    this.apiUrl =
      process.env.ZABBIX_API_URL || 'http://localhost:8080/api_jsonrpc.php';
    this.jsonRpcVersion = process.env.JSON_RPC_VERSION || '2.0';
  }

  private handleErrors(response: any) {
    if (response?.data?.error) {
      console.error(response.data.error);
      if (
        response.data.error?.data === 'Session terminated, re-login, please.'
      ) {
        throw new HttpException(
          'Session terminated, re-login, please.',
          HttpStatus.UNAUTHORIZED,
        );
      }
      throw new HttpException(
        `${response.data.error.data}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(username: string, password: string): Promise<ReturnLoginDto> {
    const response = await axios.post(this.apiUrl, {
      jsonrpc: this.jsonRpcVersion,
      method: 'user.login',
      params: { username: username, password: password },
      id: 1,
    });

    return new ReturnLoginDto(response.data.result);
  }

  async getHosts(token: string, names): Promise<InfoHostDto[]> {
    const data =
      names.length > 0
        ? { output: 'extend', filter: { host: names } }
        : { output: 'extend' };
    const response = await axios.post(
      this.apiUrl,
      {
        jsonrpc: this.jsonRpcVersion,
        method: 'host.get',
        params: data,
        id: 2,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    this.handleErrors(response);

    return response.data.result.map((host: any) => {
      return new InfoHostDto(
        host.hostid,
        host.host,
        host.status,
        host.tls_connect,
        host.tls_accept,
        host.tls_issuer,
        host.tls_subject,
        host.custom_interfaces,
        host.uuid,
        host.inventory_mode,
        host.active_available,
      );
    });
  }

  async createHost(token: string, data: CreateHostDto): Promise<ReturnHostDto> {
    const response = await axios.post(
      this.apiUrl,
      {
        jsonrpc: '2.0',
        method: 'host.create',
        params: {
          host: data.host,
          interfaces: data.interfaces,
          groups: data.groups,
        },
        id: 3,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    this.handleErrors(response);

    return new ReturnHostDto(response.data.result['hostids'][0]);
  }

  async getHostGroups(token: string): Promise<ReturnGroupDto[]> {
    const response = await axios.post(
      this.apiUrl,
      {
        jsonrpc: '2.0',
        method: 'hostgroup.get',
        params: {
          output: 'extend',
        },
        id: 4,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    this.handleErrors(response);

    return response.data.resultm.map((group: any) => {
      return new ReturnGroupDto(
        group.groupid,
        group.name,
        group.flags,
        group.uuid,
      );
    });
  }
}
