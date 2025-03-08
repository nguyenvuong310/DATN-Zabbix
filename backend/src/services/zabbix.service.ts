import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ZabbixService {
  private readonly apiUrl: string;
  private authToken: string | null = null;

  constructor() {
    this.apiUrl =
      process.env.ZABBIX_API_URL || 'http://localhost:8080/api_jsonrpc.php';
  }

  async login() {
    const response = await axios.post(this.apiUrl, {
      jsonrpc: '2.0',
      method: 'user.login',
      params: { username: 'Admin', password: 'zabbix' },
      id: 1,
    });
    console.log(response);

    this.authToken = response.data.result;
    return { auth: this.authToken };
  }

  async getHosts() {
    if (!this.authToken) {
      await this.login();
    }

    const response = await axios.post(this.apiUrl, {
      jsonrpc: '2.0',
      method: 'host.get',
      params: { output: 'extend' },
      auth: this.authToken,
      id: 2,
    });

    return response.data.result;
  }
}
