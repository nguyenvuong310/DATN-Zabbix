- [Official Zabbix Dockerfiles](https://github.com/zabbix/zabbix-docker)

For those who are used to using zabbix to collect metrics, but want to start drawing dashboards more beautifully

Example simple docker-compose service

- **Postgresql:** 16-alpine
- **Zabbix Server:** 7.2.1
- **Zabbix Frontend NGINX:** 7.2.1
- **Zabbix Proxy:** 7.2.1
- **Grafana:** 11.4.0

### Run docker-compose:

```
docker-compose up -d
```

The first launch takes 1-2 minutes

### Zabbix `localhost:8080`

default user password

- **login:** Admin
- **password:** zabbix

### Debug

```
docker-compose logs --tail=1 -f

### send email

add frontend URL: http:frontend:8080

config media type

add media type user

```
