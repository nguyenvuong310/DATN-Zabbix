import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ZabbixService {
  private readonly apiUrl: string;

  constructor() {
    this.apiUrl =
      process.env.ZABBIX_API_URL || 'http://localhost:8080/api_jsonrpc.php';
  }

  async login(username: string, password: string) {
    const response = await axios.post(this.apiUrl, {
      jsonrpc: '2.0',
      method: 'user.login',
      params: { username: username, password: password },
      id: 1,
    });

    return { auth: response.data.result };
  }

  async getHosts(token: string) {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          jsonrpc: '2.0',
          method: 'host.get',
          params: { output: 'extend' },
          id: 2,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Truyền token vào header
          },
        },
      );
      console.log(response);

      return response.data.result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new HttpException(
            `Zabbix API error: ${error.response.status} - ${error.response.statusText}`,
            error.response.status as HttpStatus,
          );
        } else if (error.request) {
          throw new HttpException(
            'No response from Zabbix server',
            HttpStatus.GATEWAY_TIMEOUT,
          );
        }
      }
      throw new HttpException(
        `Unexpected error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createHost(token: string) {
    const response = await axios.post(
      this.apiUrl,
      {
        jsonrpc: '2.0',
        method: 'host.create',
        params: {
          host: 'Camera_01',
          interfaces: [
            {
              type: 2,
              main: 1,
              useip: 1,
              ip: '192.168.1.100',
              dns: '',
              port: '10050',
            },
          ],
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
    console.log(response);
    return response.data.result;
  }

  // // ✅ Lấy dữ liệu giám sát (ping, băng thông, CPU, RAM - item.get)
  // async getItemData(hostId: string, itemName: string): Promise<any> {
  //   // const authToken = await this.authenticate();

  //   const response = await axios.post(this.apiUrl, {
  //     jsonrpc: '2.0',
  //     method: 'item.get',
  //     params: {
  //       output: ['itemid', 'name', 'lastvalue'],
  //       hostids: hostId,
  //       search: { name: itemName },
  //     },
  //     // auth: authToken,
  //     id: 3,
  //   });

  //   return response.data.result;
  // }

  // // ✅ Lấy danh sách cảnh báo về sự cố mạng (trigger.get)
  // async getNetworkAlerts(): Promise<any> {
  //   // const authToken = await this.authenticate();

  //   const response = await axios.post(this.apiUrl, {
  //     jsonrpc: '2.0',
  //     method: 'trigger.get',
  //     params: {
  //       output: ['triggerid', 'description', 'priority', 'value'],
  //       filter: { value: 1 }, // Lọc các cảnh báo đang kích hoạt
  //     },
  //     // auth: authToken,
  //     id: 4,
  //   });

  //   return response.data.result;
  // }

  // // ✅ Tạo host dành riêng cho camera
  // async createCameraHost(hostname: string, ip: string): Promise<any> {
  //   // const authToken = await this.authenticate();

  //   const response = await axios.post(this.apiUrl, {
  //     jsonrpc: '2.0',
  //     method: 'host.create',
  //     params: {
  //       host: hostname, // Tên camera
  //       interfaces: [
  //         {
  //           type: 1, // Agent (1) hoặc SNMP (2) hoặc IPMI (3)
  //           main: 1,
  //           useip: 1,
  //           ip: ip,
  //           dns: '',
  //           port: '10050',
  //         },
  //       ],
  //       groups: [
  //         { groupid: '2' }, // ID của group "Cameras" (phải kiểm tra trong Zabbix)
  //       ],
  //       templates: [
  //         { templateid: '10001' }, // ID của Template giám sát camera (ICMP/SNMP)
  //       ],
  //     },
  //     // auth: authToken,
  //     id: 2,
  //   });

  //   return response.data.result;
  // }
}
